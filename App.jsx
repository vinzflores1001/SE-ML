import { useMemo, useState } from 'react';

const Icon = ({ name, size = 20, strokeWidth = 1.9, className = '' }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', className, 'aria-hidden': true };
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></>,
    trips: <><path d="M12 20V10"/><path d="m7 15 5-5 5 5"/><path d="M5 4h14"/><path d="M5 4v3m14-3v3"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a1.7 1.7 0 0 1-3.4 0v-.2a1.7 1.7 0 0 0-2.9-1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1.7 1.7 0 0 0-1.2-2.9H4a1.7 1.7 0 0 1 0-3.4h.2a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.7 1.7 0 0 0 2.9-1.2V2a1.7 1.7 0 0 1 3.4 0v.2a1.7 1.7 0 0 0 2.9 1.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a1.7 1.7 0 0 1 0 3.4h-.2a1.7 1.7 0 0 0-1.2 2.9Z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    route: <><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h2a4 4 0 0 0 4-4v-4a4 4 0 0 1 4-4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    warning: <><path d="m10.3 3.8-8 14A1.5 1.5 0 0 0 3.6 20h16.8a1.5 1.5 0 0 0 1.3-2.2l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 3h.01"/></>,
    chart: <><path d="M4 19V5"/><path d="M4 19h17"/><rect x="7" y="12" width="3" height="5" rx=".5"/><rect x="13" y="8" width="3" height="9" rx=".5"/><rect x="19" y="4" width="2" height="13" rx=".5"/></>,
    close: <><path d="m18 6-12 12M6 6l12 12"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    cloud: <><path d="M20 16.2A4.5 4.5 0 0 0 17 8h-1.2A7 7 0 1 0 4 17h14a3 3 0 0 0 2-0.8Z"/></>,
  };
  return <svg {...common}>{paths[name] || paths.chart}</svg>;
};

const initialTrips = [
  { id: 1, route: 'Catalunan Grande → Downtown Davao', when: 'Today, 7:14 AM', duration: '38 min', congestion: 64, level: 'Moderate' },
  { id: 2, route: 'Downtown Davao → Bunawan', when: 'Today, 5:02 PM', duration: '52 min', congestion: 87, level: 'Heavy' },
  { id: 3, route: 'Catalunan Grande → Davao Medical Center', when: 'Yesterday, 6:45 AM', duration: '29 min', congestion: 41, level: 'Light' },
];

const initialAlerts = [
  { id: 1, icon: 'warning', title: 'Peak congestion ahead', message: 'Catalunan Grande → Downtown: 88% congestion predicted 7–9 AM. Leave by 6:40 AM or use Diversion Rd.', time: '6:15 AM', tone: 'amber', unread: true },
  { id: 2, icon: 'chart', title: 'Route cleared', message: 'Bunawan bypass is now flowing. Congestion dropped from 79% to 34%.', time: 'Yesterday 5:48 PM', tone: 'blue', unread: true },
  { id: 3, icon: 'warning', title: 'Friday rush predicted', message: 'High congestion (85%+) expected Friday 5–7 PM on main downtown routes.', time: 'Sep 17, 4:00 PM', tone: 'amber', unread: false },
  { id: 4, icon: 'chart', title: 'Pattern detected', message: 'ML model identified recurring slowdown every Monday 7:30–9 AM near Matina Interchange.', time: 'Sep 16, 8:00 AM', tone: 'purple', unread: false },
];

const weekly = [
  { day: 'Mon', value: 78, level: 'heavy' },
  { day: 'Tue', value: 60, level: 'moderate' },
  { day: 'Wed', value: 88, level: 'heavy' },
  { day: 'Thu', value: 71, level: 'moderate' },
  { day: 'Fri', value: 95, level: 'heavy' },
  { day: 'Sat', value: 45, level: 'light' },
  { day: 'Sun', value: 38, level: 'light' },
];

function Toggle({ checked, onChange, label }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} className={`toggle ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}><span /></button>;
}

function Brand() {
  return <div className="brand-lockup"><div className="brand-name">FlowCast</div><div className="brand-caption">Traffic Forecasting</div></div>;
}

function BottomNav({ active, onChange, alertCount }) {
  const items = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'trips', label: 'Trips', icon: 'trips' },
    { id: 'alerts', label: 'Alerts', icon: 'bell' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];
  return <nav className="bottom-nav" aria-label="Main navigation">
    {items.map(item => <button key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`} onClick={() => onChange(item.id)} aria-current={active === item.id ? 'page' : undefined}>
      <span className="nav-icon-wrap"><Icon name={item.icon} size={20} />{item.id === 'alerts' && alertCount > 0 && <i className="nav-dot" />}</span>
      <span>{item.label}</span>
    </button>)}
  </nav>;
}

function PageHeader({ title, subtitle, right }) {
  return <header className="page-header"><div className="header-copy"><h1>{title}</h1><p>{subtitle}</p></div>{right}</header>;
}

function LevelPill({ level }) {
  const normalized = (level || 'Moderate').toLowerCase();
  return <span className={`level-pill ${normalized}`}>{level}</span>;
}

function Metric({ value, label }) {
  return <div className="metric"><strong>{value}</strong><span>{label}</span></div>;
}

function WeeklyChart() {
  return <div className="weekly-chart" role="img" aria-label="Weekly congestion pattern, highest on Friday and Wednesday">
    <div className="bar-chart">
      {weekly.map(item => <div className="bar-column" key={item.day}>
        <div className={`bar ${item.level}`} style={{ height: `${item.value}%` }} title={`${item.day}: ${item.value}%`} />
        <span className="bar-day">{item.day}</span>
      </div>)}
    </div>
    <div className="chart-legend"><span><i className="legend-dot heavy" />Heavy</span><span><i className="legend-dot moderate" />Moderate</span><span><i className="legend-dot light" />Light</span></div>
  </div>;
}

function TodayChart() {
  const hours = [
    { label: '8AM', value: 31 }, { label: '10AM', value: 48 }, { label: '12PM', value: 39 },
    { label: '2PM', value: 59 }, { label: '4PM', value: 51 }, { label: '6PM', value: 72 }, { label: '8PM', value: 56 },
  ];
  return <div className="today-chart" role="img" aria-label="Hourly congestion forecast today">
    {hours.map((item, index) => <div className="today-column" key={item.label}>
      <div className={`today-bar ${item.value > 60 ? 'high' : item.value > 45 ? 'mid' : ''}`} style={{ height: `${item.value}%` }} title={`${item.label}: ${item.value}%`} />
      <span>{item.label}</span>
    </div>)}
  </div>;
}

function RouteRow({ trip }) {
  return <div className="trip-row">
    <div className="trip-route-block"><strong>{trip.route}</strong><span>{trip.when} · {trip.duration}</span></div>
    <div className="trip-score"><strong className={trip.congestion >= 80 ? 'danger-text' : trip.congestion < 50 ? 'success-text' : ''}>{trip.congestion}%</strong><LevelPill level={trip.level} /></div>
  </div>;
}

function HomePage({ onViewRoute }) {
  return <>
    <section className="home-intro"><div><h1>Good morning, Driver</h1><p>Here’s your route outlook</p></div><div className="weather-chip"><Icon name="cloud" size={16} /><span>29°</span></div></section>
    <section className="surface current-route-card">
      <div className="eyebrow">CURRENT ROUTE</div>
      <div className="current-route-name">Catalunan Grande <span>→</span> Downtown Davao</div>
      <LevelPill level="Moderate" />
      <div className="route-prediction"><strong>64%</strong><span>Predicted congestion</span></div>
      <div className="muted-line"><Icon name="clock" size={14} /> 12 min expected delay</div>
    </section>
    <section className="suggestion-card">
      <div className="eyebrow">ROUTE SUGGESTION</div>
      <h2>Leave 10–15 minutes earlier</h2>
      <p>Or use an alternate route.</p>
      <button className="white-button" onClick={onViewRoute}>View route <Icon name="arrow" size={15} /></button>
      <div className="suggestion-decoration" aria-hidden="true"><span /><span /><span /></div>
    </section>
    <section className="section-block">
      <div className="section-title-row"><h2>Today’s congestion</h2><span className="small-muted">Hourly forecast · Davao City</span></div>
      <div className="surface today-card"><TodayChart /></div>
    </section>
    <section className="peak-alert">
      <div className="peak-icon"><Icon name="warning" size={18} /></div>
      <div><strong>Peak hours: Mon &amp; Fri 7–9 AM / 5–7 PM</strong><p>DBSCAN identified recurring congestion near Tibungco intersection.</p></div>
    </section>
    <div className="bottom-spacer" />
  </>;
}

function TripsPage({ trips, onAddTrip }) {
  const total = 247 + Math.max(0, trips.length - initialTrips.length);
  return <>
    <PageHeader title="Trip Log" subtitle="Your commute history & ML training data" right={<div className="header-spark"><Icon name="route" size={20} /></div>} />
    <div className="page-content">
      <button className="primary-button full-button" onClick={onAddTrip}><Icon name="plus" size={19} /> Log New Trip</button>
      <div className="metrics-grid"><Metric value={total} label="Total Trips"/><Metric value="61%" label="Avg Congestion"/><Metric value="18 min" label="Avg Delay"/></div>
      <section className="section-block trips-weekly"><div className="section-title-row"><h2>Weekly pattern</h2><button className="text-action" type="button">This week <span>⌄</span></button></div><WeeklyChart /></section>
      <section className="section-block recent-section"><div className="section-title-row"><h2>Recent trips</h2><span className="small-muted">Last 7 days</span></div>
        <div className="trip-list">{trips.map(trip => <RouteRow key={trip.id} trip={trip} />)}</div>
      </section>
    </div>
    <div className="bottom-spacer" />
  </>;
}

function AlertsPage({ alerts, onDismiss, onMarkRead }) {
  const unreadCount = alerts.filter(alert => alert.unread).length;
  return <>
    <PageHeader title="Alerts" subtitle="Push notifications & ML insights" right={unreadCount > 0 ? <span className="new-pill">{unreadCount} new</span> : <span className="all-clear"><Icon name="check" size={15} /> All caught up</span>} />
    <div className="page-content alerts-content">
      {alerts.length === 0 ? <div className="empty-state"><div className="empty-icon"><Icon name="bell" size={25} /></div><h2>You’re all caught up</h2><p>New traffic insights will appear here.</p></div> : alerts.map(alert => <article className={`alert-card ${alert.tone} ${alert.unread ? 'unread' : ''}`} key={alert.id}>
        <div className="alert-icon"><Icon name={alert.icon} size={18} /></div>
        <div className="alert-copy"><div className="alert-title-line"><h3>{alert.title}</h3>{alert.unread && <span className="unread-dot" />}</div><p>{alert.message}</p><span className="alert-time">{alert.time}</span></div>
        <button className="dismiss-button" onClick={() => onDismiss(alert.id)} aria-label={`Dismiss ${alert.title}`}><Icon name="close" size={14} /></button>
        {alert.unread && <button className="mark-read-hitarea" onClick={() => onMarkRead(alert.id)} aria-label={`Mark ${alert.title} as read`} title="Mark as read" />}
      </article>)}
      <p className="alerts-footnote"><Icon name="check" size={14} /> Insights are updated as traffic conditions change.</p>
    </div>
    <div className="bottom-spacer" />
  </>;
}

function SettingsPage({ settings, setSettings, leadTime, setLeadTime }) {
  const [saved, setSaved] = useState(false);
  const changeSetting = (key, value) => { setSettings(current => ({ ...current, [key]: value })); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const leadTimes = ['30m', '1h', '2h', '3h', 'Real-time'];
  return <>
    <PageHeader title="Settings" subtitle="Preferences & system configuration" right={<div className="header-spark"><Icon name="settings" size={20} /></div>} />
    <div className="page-content settings-content">
      <section className="profile-card surface"><div className="avatar">D</div><div className="profile-copy"><strong>Driver - Davao City</strong><span>driver@flowcast.ph</span></div><button className="profile-edit" aria-label="Edit driver profile" onClick={() => changeSetting('profileEdit', !settings.profileEdit)}><Icon name="chevron" size={18} /></button></section>
      {settings.profileEdit && <div className="inline-note">Profile editing will be connected to your account service.</div>}
      <section className="settings-card surface"><div className="settings-section-label">NOTIFICATIONS</div>
        <div className="setting-row"><div><strong>Push Alerts</strong><span>Push notifications about traffic</span></div><Toggle checked={settings.pushAlerts} onChange={value => changeSetting('pushAlerts', value)} label="Push alerts" /></div>
        <div className="lead-time-block"><div className="setting-label">Notification Lead Time</div><div className="lead-time-options" role="group" aria-label="Notification lead time">{leadTimes.map(time => <button key={time} className={leadTime === time ? 'selected' : ''} onClick={() => { setLeadTime(time); setSaved(true); window.setTimeout(() => setSaved(false), 1800); }}>{time}</button>)}</div></div>
        <div className="setting-row safe-route-row"><div><strong>Prioritize Safe Routes</strong><span>Avoid hazard/unsafe-driver zones</span></div><Toggle checked={settings.safeRoutes} onChange={value => changeSetting('safeRoutes', value)} label="Prioritize safe routes" /></div>
      </section>
      <section className="settings-card surface ml-card"><div className="settings-section-label">ML SYSTEM</div>
        <div className="system-row"><span>Pattern Detection</span><strong>DBSCAN Clustering</strong></div>
        <div className="system-row"><span>Prediction Model</span><strong>Random Forest</strong></div>
        <div className="system-row"><span>Last Retrained</span><strong>14 Sep 2026</strong></div>
        <div className="system-row"><span>Model Accuracy</span><strong>91.4% RMSE</strong></div>
        <div className="system-row"><span>Response Time</span><strong className="system-green">&lt;3 seconds</strong></div>
        <div className="system-row"><span>Availability</span><strong>5AM–10PM daily</strong></div>
        <div className="model-status"><span className="status-pulse" /> Model is operational</div>
      </section>
      {saved && <div className="save-toast" role="status"><Icon name="check" size={16} /> Preference updated</div>}
      <p className="version-label">FLOWCAST DRIVER · UI PREVIEW · V1.0.0</p>
    </div>
    <div className="bottom-spacer" />
  </>;
}

function TripModal({ onClose, onSave }) {
  const [route, setRoute] = useState('Catalunan Grande → Downtown Davao');
  const [duration, setDuration] = useState('38');
  const [congestion, setCongestion] = useState(64);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');
  const submit = event => {
    event.preventDefault();
    if (!route.trim()) { setError('Enter a route to save this trip.'); return; }
    const mins = Number(duration);
    if (!Number.isFinite(mins) || mins < 1 || mins > 600) { setError('Duration must be between 1 and 600 minutes.'); return; }
    const level = congestion >= 80 ? 'Heavy' : congestion < 50 ? 'Light' : 'Moderate';
    onSave({ id: Date.now(), route: route.trim(), when: `${date}, just logged`, duration: `${mins} min`, congestion: Number(congestion), level });
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="trip-modal" role="dialog" aria-modal="true" aria-labelledby="trip-modal-title">
      <div className="modal-heading"><div><span className="modal-eyebrow">COMMUTE HISTORY</span><h2 id="trip-modal-title">Log a new trip</h2></div><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={19} /></button></div>
      <form onSubmit={submit}>
        <label className="form-label">Route <span>Required</span><input value={route} onChange={event => setRoute(event.target.value)} placeholder="Start point → destination" /></label>
        <label className="form-label">Trip date<input type="date" value={date} onChange={event => setDate(event.target.value)} /></label>
        <label className="form-label">Travel duration (minutes)<input inputMode="numeric" type="number" min="1" max="600" value={duration} onChange={event => setDuration(event.target.value)} /></label>
        <div className="form-label"><div className="slider-label"><span>Observed congestion</span><strong>{congestion}%</strong></div><input className="congestion-slider" type="range" min="0" max="100" value={congestion} onChange={event => setCongestion(event.target.value)} /><div className="slider-ends"><span>Clear</span><span>Heavy</span></div></div>
        {error && <p className="form-error">{error}</p>}
        <button className="primary-button full-button submit-button" type="submit"><Icon name="check" size={18} /> Save Trip</button>
      </form>
      <p className="modal-disclaimer">Saved locally in this UI preview. Connect your API to persist trip logs.</p>
    </section>
  </div>;
}

function RouteModal({ onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="trip-modal route-modal" role="dialog" aria-modal="true" aria-labelledby="route-modal-title">
      <div className="modal-heading"><div><span className="modal-eyebrow">LIVE ROUTE OUTLOOK</span><h2 id="route-modal-title">Your morning commute</h2></div><button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="close" size={19} /></button></div>
      <div className="route-modal-map"><div className="map-grid"/><svg viewBox="0 0 330 150" preserveAspectRatio="none" aria-label="Illustration of the recommended route"><path d="M-5 112 C40 112 45 32 105 49 S167 121 204 79 S269 46 338 48" fill="none" stroke="#cddcf4" strokeWidth="19" strokeLinecap="round"/><path d="M-5 112 C40 112 45 32 105 49 S167 121 204 79 S269 46 338 48" fill="none" stroke="#2e75df" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 3"/><circle cx="18" cy="99" r="7" fill="#1b57ba" stroke="white" strokeWidth="3"/><circle cx="301" cy="48" r="7" fill="#26a879" stroke="white" strokeWidth="3"/></svg><span className="map-label map-start">Catalunan Grande</span><span className="map-label map-end">Downtown</span></div>
      <div className="route-detail-row"><div><span className="detail-label">Predicted congestion</span><strong className="detail-value">64% <LevelPill level="Moderate" /></strong></div><div><span className="detail-label">Estimated delay</span><strong className="detail-value">12 min</strong></div></div>
      <div className="recommendation-block"><div className="recommendation-icon"><Icon name="check" size={18} /></div><div><strong>Recommended departure</strong><p>Leave between <b>6:25–6:40 AM</b> to stay ahead of the morning peak.</p></div></div>
      <div className="alternative-route"><Icon name="route" size={19} /><div><strong>Alternative: Diversion Road</strong><p>May reduce congestion by an estimated 18%.</p></div><span className="alt-time">−8 min</span></div>
      <button className="primary-button full-button" onClick={onClose}>Got it</button>
    </section>
  </div>;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [trips, setTrips] = useState(initialTrips);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [modal, setModal] = useState(null);
  const [leadTime, setLeadTime] = useState('2h');
  const [settings, setSettings] = useState({ pushAlerts: true, safeRoutes: true, profileEdit: false });
  const unreadCount = useMemo(() => alerts.filter(alert => alert.unread).length, [alerts]);

  const saveTrip = trip => { setTrips(current => [trip, ...current]); setModal(null); setActiveTab('trips'); };
  const dismissAlert = id => setAlerts(current => current.filter(alert => alert.id !== id));
  const markAlertRead = id => setAlerts(current => current.map(alert => alert.id === id ? { ...alert, unread: false } : alert));

  return <main className="app-stage">
    <div className="ambient ambient-one" aria-hidden="true"/><div className="ambient ambient-two" aria-hidden="true"/>
    <div className="desktop-caption"><span className="caption-logo"><i /> FLOWCAST</span><span>DRIVER COMPANION <b>•</b> TRAFFIC INTELLIGENCE</span></div>
    <section className="app-shell" aria-label="FlowCast Driver app">
      <div className="status-bar"><span>9:41</span><div className="status-right"><span className="status-signal"><i/><i/><i/><i/></span><span className="status-wifi">⌁</span><span className="battery"><i/></span></div></div>
      <div className={`app-scroll ${activeTab === 'home' ? 'home-scroll' : ''}`} key={activeTab}>
        {activeTab === 'home' && <><div className="home-topbar"><Brand /><button className="live-indicator" aria-label="Forecast status: live"><span />LIVE</button></div><HomePage onViewRoute={() => setModal('route')} /></>}
        {activeTab === 'trips' && <TripsPage trips={trips} onAddTrip={() => setModal('trip')} />}
        {activeTab === 'alerts' && <AlertsPage alerts={alerts} onDismiss={dismissAlert} onMarkRead={markAlertRead} />}
        {activeTab === 'settings' && <SettingsPage settings={settings} setSettings={setSettings} leadTime={leadTime} setLeadTime={setLeadTime} />}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} alertCount={unreadCount} />
      <div className="home-indicator"><span /></div>
    </section>
    <footer className="stage-footer"><span><i className="footer-live-dot"/> UI preview</span><span>Data shown is sample Davao commute data</span></footer>
    {modal === 'trip' && <TripModal onClose={() => setModal(null)} onSave={saveTrip} />}
    {modal === 'route' && <RouteModal onClose={() => setModal(null)} />}
  </main>;
}
