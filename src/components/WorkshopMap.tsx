// Source: Google Maps Platform Code Assist
import React, { useState, useCallback, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation, Compass, Layers, Phone, Check, ExternalLink, ShieldCheck, LocateFixed } from 'lucide-react';
import { WORKSHOP_DETAILS, getWhatsAppUrl } from '../data/workshopData';
import { WhatsAppIcon } from './WhatsAppIcon';

// NovaTech Solutions Workshop Coordinates (Arbor Park, Tzaneen, Limpopo)
const WORKSHOP_COORDS = {
  lat: -23.8338,
  lng: 30.1628
};

// Key Service Hubs in Tzaneen Region
const SERVICE_HUBS = [
  {
    id: 'workshop',
    name: 'NovaTech Solutions Lab & Store',
    category: 'Primary Workshop',
    address: 'H-11, Saligna Street, Arbor Park, Tzaneen, Limpopo - 0850',
    description: 'Hardware diagnostics, screen repairs, laptop & desktop sales, POS setup.',
    coords: WORKSHOP_COORDS,
    pinColor: '#00d4ff',
    borderColor: '#0a2540',
    glyphColor: '#0a2540'
  },
  {
    id: 'cbd',
    name: 'Tzaneen CBD Retail District',
    category: 'POS & Business Support',
    address: 'Agatha & Danie Joubert St Corridor, Tzaneen',
    description: 'On-site POS installations, receipt printers, till rolls, and emergency store callouts.',
    coords: { lat: -23.8315, lng: 30.1645 },
    pinColor: '#25d366',
    borderColor: '#0a2540',
    glyphColor: '#ffffff'
  },
  {
    id: 'farms',
    name: 'Manorvlei & Agatha Farm Estates',
    category: 'CCTV & Perimeter Security',
    address: 'Agatha Road & Surrounding Farms',
    description: 'Agricultural high-definition CCTV surveillance, solar-linked security, long-range wireless links.',
    coords: { lat: -23.8510, lng: 30.1490 },
    pinColor: '#f59e0b',
    borderColor: '#0a2540',
    glyphColor: '#ffffff'
  },
  {
    id: 'letaba',
    name: 'Letaba Industrial & Warehouse Zone',
    category: 'Network & CCTV Maintenance',
    address: 'R71 Industrial Corridor, Tzaneen',
    description: 'Commercial CCTV maintenance, NVR backups, structured networking, and server maintenance.',
    coords: { lat: -23.8240, lng: 30.1780 },
    pinColor: '#6366f1',
    borderColor: '#0a2540',
    glyphColor: '#ffffff'
  }
];

// Sub-component for interactive map camera controls
const MapCameraControls: React.FC<{
  onRecenter: () => void;
  onSelectHub: (coords: { lat: number; lng: number }, zoom: number) => void;
  activeHubId: string;
}> = ({ onRecenter, onSelectHub, activeHubId }) => {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleLocateUser = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        if (map) {
          map.panTo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          map.setZoom(15);
        }
      },
      () => {
        setLocating(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white border-b border-[#e6ebf1] text-xs">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[#697386] font-semibold flex items-center gap-1 mr-1">
          <Layers className="w-3.5 h-3.5 text-[#0a2540]" />
          <span>Quick Views:</span>
        </span>

        {SERVICE_HUBS.map((hub) => (
          <button
            key={hub.id}
            type="button"
            onClick={() => onSelectHub(hub.coords, hub.id === 'workshop' ? 16 : 14)}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer text-xs ${
              activeHubId === hub.id
                ? 'bg-[#0a2540] text-white'
                : 'bg-[#f7f9fc] hover:bg-slate-200 text-[#0a2540] border border-[#e6ebf1]'
            }`}
          >
            {hub.id === 'workshop' ? '★ Arbor Park Workshop' : hub.name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLocateUser}
          disabled={locating}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          title="Center map to my current location"
        >
          <LocateFixed className="w-3.5 h-3.5 text-[#00d4ff]" />
          <span>{locating ? 'Locating...' : 'My Location'}</span>
        </button>

        <button
          type="button"
          onClick={onRecenter}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          title="Reset map view to workshop"
        >
          <Compass className="w-3.5 h-3.5 text-[#00d4ff]" />
          <span>Reset to Workshop</span>
        </button>
      </div>
    </div>
  );
};

export const WorkshopMap: React.FC = () => {
  const rawApiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [hasAuthError, setHasAuthError] = useState(false);
  const [selectedHub, setSelectedHub] = useState<(typeof SERVICE_HUBS)[0] | null>(SERVICE_HUBS[0]);
  const [activeHubId, setActiveHubId] = useState('workshop');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);

  // Safely intercept Google Maps authentication failures to prevent InvalidKeyMapError crashes
  useEffect(() => {
    const prevAuthFailure = (window as unknown as { gm_authFailure?: () => void }).gm_authFailure;
    (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = () => {
      console.warn('Google Maps authentication failure detected (InvalidKeyMapError). Falling back to embedded interactive map.');
      setHasAuthError(true);
      if (typeof prevAuthFailure === 'function') {
        try {
          prevAuthFailure();
        } catch {
          // ignore
        }
      }
    };

    return () => {
      (window as unknown as { gm_authFailure?: () => void }).gm_authFailure = prevAuthFailure;
    };
  }, []);

  // Google Maps Platform keys strictly start with 'AIza' (e.g. AIzaSy...).
  // Environment variables with session tokens or OAuth tokens (starting with 'AQ.' or other prefixes)
  // are not valid Google Maps Platform keys and cause InvalidKeyMapError.
  const isKeyFormatValid = Boolean(
    rawApiKey &&
    typeof rawApiKey === 'string' &&
    rawApiKey.trim().startsWith('AIza') &&
    rawApiKey.trim().length >= 30
  );

  const canUseMapsSdk = isKeyFormatValid && !hasAuthError;

  const handleSelectHub = useCallback((coords: { lat: number; lng: number }, _zoom: number) => {
    const hub = SERVICE_HUBS.find((h) => h.coords.lat === coords.lat && h.coords.lng === coords.lng) || SERVICE_HUBS[0];
    setSelectedHub(hub);
    setActiveHubId(hub.id);
    setInfoWindowOpen(true);
  }, []);

  const handleRecenter = useCallback(() => {
    setSelectedHub(SERVICE_HUBS[0]);
    setActiveHubId('workshop');
    setInfoWindowOpen(true);
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-[#e6ebf1] shadow-xs overflow-hidden" id="workshop-map">
      {/* Map Header */}
      <div className="p-4 sm:p-5 border-b border-[#e6ebf1] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
              {canUseMapsSdk ? 'Interactive Google Maps Platform' : 'Interactive Workshop Location Map'}
            </span>
            <span className="bg-blue-100 text-[#0a2540] text-[10px] font-semibold px-2 py-0.5 rounded-full">
              Tzaneen &amp; Mopani District
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0a2540]">
            NovaTech Solutions Interactive Location &amp; Service Zones
          </h3>
          <p className="text-xs sm:text-sm text-[#697386]">
            H-11, Saligna Street, Arbor Park, Tzaneen • Diagnostic lab, laptop store &amp; on-site callout hub
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={WORKSHOP_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#0a2540] hover:bg-[#123962] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-xs"
            id="open-external-gmaps-btn"
          >
            <Navigation className="w-3.5 h-3.5 text-[#00d4ff]" />
            <span>Open in Google Maps</span>
          </a>
        </div>
      </div>

      {/* Map View Area */}
      {canUseMapsSdk ? (
        <APIProvider apiKey={rawApiKey.trim()} libraries={['marker']}>
          <MapCameraControls
            onRecenter={handleRecenter}
            onSelectHub={handleSelectHub}
            activeHubId={activeHubId}
          />

          <div className="h-[440px] sm:h-[480px] w-full relative">
            <Map
              mapId="DEMO_MAP_ID"
              defaultCenter={WORKSHOP_COORDS}
              defaultZoom={15}
              gestureHandling="greedy"
              fullscreenControl={true}
              streetViewControl={true}
              mapTypeControl={true}
              zoomControl={true}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              className="w-full h-full"
            >
              {SERVICE_HUBS.map((hub) => (
                <AdvancedMarker
                  key={hub.id}
                  position={hub.coords}
                  ref={hub.id === activeHubId ? markerRef : undefined}
                  onClick={() => {
                    setSelectedHub(hub);
                    setActiveHubId(hub.id);
                    setInfoWindowOpen(true);
                  }}
                  title={hub.name}
                >
                  <Pin
                    background={hub.pinColor}
                    borderColor={hub.borderColor}
                    glyphColor={hub.glyphColor}
                    scale={hub.id === 'workshop' ? 1.3 : 1.0}
                  />
                </AdvancedMarker>
              ))}

              {infoWindowOpen && selectedHub && marker && (
                <InfoWindow
                  anchor={marker}
                  maxWidth={320}
                  onCloseClick={() => setInfoWindowOpen(false)}
                >
                  <div className="p-1 text-slate-800">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                        {selectedHub.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#0a2540] mb-1">
                      {selectedHub.name}
                    </h4>
                    <p className="text-xs text-[#697386] mb-2 leading-tight">
                      {selectedHub.address}
                    </p>
                    <p className="text-xs text-[#1a1f36] mb-3 bg-slate-50 p-2 rounded border border-slate-100">
                      {selectedHub.description}
                    </p>

                    <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                      <a
                        href={WORKSHOP_DETAILS.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a2540] hover:underline"
                      >
                        <Navigation className="w-3 h-3 text-[#00d4ff]" />
                        <span>Directions</span>
                      </a>
                      <span className="text-slate-300">•</span>
                      <a
                        href={getWhatsAppUrl(`Hi Umarfaruk, I am looking at your location (${selectedHub.name}) on Google Maps.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:underline"
                      >
                        <WhatsAppIcon className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>
                      <span className="text-slate-300">•</span>
                      <a
                        href={`tel:${WORKSHOP_DETAILS.phone}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:underline ml-auto"
                      >
                        <Phone className="w-3 h-3 text-slate-500" />
                        <span>Call</span>
                      </a>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </div>
        </APIProvider>
      ) : (
        /* Fallback View with embedded Google Maps & Platform Notice */
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white border-b border-[#e6ebf1] text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#697386] font-semibold flex items-center gap-1 mr-1">
                <Layers className="w-3.5 h-3.5 text-[#0a2540]" />
                <span>Service Zone:</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-[#0a2540] text-white font-medium text-xs">
                Arbor Park Workshop, Tzaneen
              </span>
              <span className="text-[#697386] hidden sm:inline">• Lat: -23.8338, Lng: 30.1628</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={WORKSHOP_DETAILS.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0a2540] bg-[#f7f9fc] hover:bg-slate-200 border border-[#e6ebf1] px-2.5 py-1 rounded-md transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span>Get Turn-by-Turn Directions</span>
              </a>
            </div>
          </div>

          <div className="h-[440px] sm:h-[480px] w-full relative bg-slate-100">
            <iframe
              title="NovaTech Solutions Tzaneen Workshop Google Map"
              src="https://maps.google.com/maps?q=H-11+Saligna+Street+Arbor+Park+Tzaneen+Limpopo+0850&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlaid Quick Info Card on bottom left */}
            <div className="absolute bottom-4 left-4 max-w-sm bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#e6ebf1] shadow-lg pointer-events-auto z-10 hidden sm:block">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-[#0a2540] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#0a2540]">NovaTech Solutions</h4>
                  <p className="text-[11px] text-[#697386]">H-11, Saligna Street, Arbor Park</p>
                </div>
              </div>
              <p className="text-xs text-[#697386] mb-3">
                Manager: <strong className="text-[#1a1f36]">Umarfaruk</strong> • Walk-ins &amp; emergency diagnostic drop-offs welcome.
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${WORKSHOP_DETAILS.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold py-1.5 bg-[#f7f9fc] border border-[#e6ebf1] rounded-lg text-[#0a2540] hover:bg-slate-100"
                >
                  <Phone className="w-3 h-3 text-[#0a2540]" />
                  <span>Call</span>
                </a>
                <a
                  href={getWhatsAppUrl('Hi Umarfaruk, I am navigating to your Arbor Park workshop in Tzaneen.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-bold py-1.5 bg-[#25d366] text-white rounded-lg hover:bg-[#128c7e]"
                >
                  <WhatsAppIcon className="w-3 h-3 text-white" />
                  <span>Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Coverage Badges below Map */}
      <div className="p-4 sm:p-5 bg-white border-t border-[#e6ebf1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1]/60">
          <div className="w-7 h-7 rounded-md bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-[#0a2540]" />
          </div>
          <div>
            <div className="font-bold text-[#0a2540]">Arbor Park Workshop</div>
            <div className="text-[#697386] text-[11px]">Primary drop-off, bench test &amp; component sales</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1]/60">
          <div className="w-7 h-7 rounded-md bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div>
            <div className="font-bold text-[#0a2540]">Tzaneen Central CBD</div>
            <div className="text-[#697386] text-[11px]">Same-day POS setup &amp; thermal receipt supplies</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1]/60">
          <div className="w-7 h-7 rounded-md bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <div className="font-bold text-[#0a2540]">Agatha &amp; Farm Outlets</div>
            <div className="text-[#697386] text-[11px]">CCTV perimeter security &amp; wireless links</div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#f7f9fc] border border-[#e6ebf1]/60">
          <div className="w-7 h-7 rounded-md bg-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
            <ExternalLink className="w-4 h-4 text-indigo-700" />
          </div>
          <div>
            <div className="font-bold text-[#0a2540]">Greater Letaba District</div>
            <div className="text-[#697386] text-[11px]">Industrial warehouse CCTV &amp; network callouts</div>
          </div>
        </div>
      </div>
    </div>
  );
};
