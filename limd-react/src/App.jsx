import { useMemo, useState } from "react";
import {
  Activity, Bell, BookOpen, Boxes, ChartNoAxesCombined, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, ClipboardList, GraduationCap,
  LayoutDashboard, LogOut, Menu, MoreHorizontal, Pencil, Plus, Search,
  Settings, ShieldCheck, Trash2, Users, X, Eye, EyeOff, UserRound,
  Building2, CalendarDays, Check, Filter
} from "lucide-react";

const initialUsers = [
  { id: 1, initials: "ER", name: "Dra. Elena Rodríguez", email: "elena@limd.edu.mx", role: "Administrador", status: "Activo", last: "hace 3 min" },
  { id: 2, initials: "CM", name: "Prof. Carlos Mendoza", email: "carlos@limd.edu.mx", role: "Docente", status: "Activo", last: "hace 1 hora" },
  { id: 3, initials: "AT", name: "Profa. Ana María Torres", email: "ana.torres@limd.edu.mx", role: "Docente", status: "Activo", last: "Ayer" },
  { id: 4, initials: "MF", name: "Mateo Fernández", email: "mateo.fdz@limd.edu.mx", role: "Estudiante", status: "Activo", last: "hace 20 min" },
  { id: 5, initials: "SB", name: "Sofía Benítez", email: "sofia.b@limd.edu.mx", role: "Estudiante", status: "Activo", last: "hace 2 horas" },
  { id: 6, initials: "CP", name: "Carlos Benítez (Padre)", email: "carlos.p@limd.edu.mx", role: "Tutor", status: "Activo", last: "hace 3 días" },
];

const nav = [
  { label: "Resumen / Inicio", icon: LayoutDashboard },
  { label: "Gestión de Cuentas", icon: Users, group: "ACADÉMICO" },
  { label: "Docentes y Estudiantes", icon: GraduationCap },
  { label: "Asignaturas y Grupos", icon: BookOpen },
  { label: "Configuración General", icon: Settings, group: "CONFIGURACIÓN" },
];

function Brand({ compact = false }) {
  return <div className="brand"><div className="brand-mark"><Boxes size={22}/></div>{!compact && <div><b>LIMD</b><small>LABORATORIO INTERACTIVO</small></div>}</div>;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Ingresa tu correo electrónico y contraseña.");
      return;
    }
    onLogin();
  }

  return <main className="login-page">
    <section className="login-intro">
      <Brand/>
      <div className="intro-copy">
        <span className="eyebrow">PLATAFORMA ACADÉMICA</span>
        <h1>Las matemáticas<br/><em>cobran vida.</em></h1>
        <p>Explora conceptos, resuelve desafíos y desarrolla tus habilidades en Matemáticas Discretas mediante experiencias interactivas.</p>
        <div className="math-art"><div className="math-grid"></div><div className="math-node n1"></div><div className="math-node n2"></div><div className="math-node n3"></div><div className="math-line l1"></div><div className="math-line l2"></div><div className="math-line l3"></div><span>∑</span><span>∧</span><span>∀</span></div>
      </div>
      <small className="copyright">© 2026 LIMD. Todos los derechos reservados.</small>
    </section>
    <section className="login-form-wrap">
      <form className="login-card" onSubmit={submit}>
        <div className="login-heading"><div className="mobile-brand"><Brand/></div><span className="eyebrow blue">BIENVENIDO/A</span><h2>Iniciar sesión</h2><p>Accede a tu cuenta para continuar.</p></div>
        <label>Correo electrónico</label>
        <div className="field"><UserRound size={17}/><input type="email" placeholder="usuario@institucion.edu.mx" value={email} onChange={e=>setEmail(e.target.value)}/></div>
        <label>Contraseña</label>
        <div className="field"><ShieldCheck size={17}/><input type={show ? "text" : "password"} placeholder="Ingresa tu contraseña" value={password} onChange={e=>setPassword(e.target.value)}/><button className="icon-button" type="button" onClick={()=>setShow(!show)} aria-label="Mostrar contraseña">{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
        <div className="form-options"><label className="check-label"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Recordarme</label><button type="button" className="text-button" onClick={()=>setError("Contacta al administrador para recuperar tu acceso.")}>¿Olvidaste tu contraseña?</button></div>
        {error && <div className="form-error">{error}</div>}
        <button className="primary-button full" type="submit">Iniciar sesión <ChevronRight size={17}/></button>
        <div className="or-divider"><span>o continúa con</span></div>
        <button type="button" className="secondary-button full" onClick={()=>setError("El acceso institucional se habilitará al conectar el servicio de autenticación.")}><Building2 size={17}/> Iniciar sesión institucional</button>
        <p className="login-help">¿No tienes cuenta? <button type="button" className="text-button" onClick={()=>setError("Solicita una cuenta al administrador de LIMD.")}>Contacta al administrador</button></p>
      </form>
    </section>
  </main>;
}

function Sidebar({ page, setPage, onLogout, mobileOpen, setMobileOpen }) {
  return <>
    {mobileOpen && <button className="mobile-scrim" onClick={()=>setMobileOpen(false)} aria-label="Cerrar menú"/>}
    <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
      <div className="side-top"><Brand/><button className="collapse-button" onClick={()=>setMobileOpen(false)}><ChevronLeft size={17}/></button></div>
      <div className="cycle"><span>Ciclo lectivo</span><b>2026 - A</b></div>
      <nav className="side-nav">
        {nav.map((item, i) => <div key={item.label}>
          {item.group && <p className="nav-group">{item.group}</p>}
          <button className={`nav-item ${page===item.label ? "active" : ""}`} onClick={()=>{setPage(item.label);setMobileOpen(false)}}><item.icon size={17}/><span>{item.label}</span>{page===item.label && <ChevronRight size={15}/>}</button>
        </div>)}
      </nav>
      <button className="profile-mini" onClick={onLogout}><div className="avatar admin-avatar">AD</div><div><b>Admin Principal</b><small>admin@limd.edu.mx</small></div><LogOut size={15}/></button>
    </aside>
  </>;
}

function Topbar({ title, setMobileOpen }) {
  return <header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu/></button><div className="top-title">{title}</div><div className="top-search"><Search size={15}/><input placeholder="Buscar en el panel..."/></div><button className="top-icon"><Bell size={18}/><i/></button><button className="top-icon"><CircleHelp size={18}/></button><div className="top-user"><div className="avatar blue-avatar">AR</div><div><b>Admin Principal</b><small>Administrador</small></div><ChevronDown size={15}/></div></header>;
}

function StatCard({ label, value, note, icon: Icon, tone, trend }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={18}/></div></div><strong>{value}</strong><small className={trend ? "positive" : ""}>{note}</small></article>;
}

function Distribution() {
  const rows = [{name:"Estudiantes",n:920,p:73.7,color:"#6957f5"},{name:"Tutores / Padres",n:270,p:21.6,color:"#1687ed"},{name:"Docentes",n:48,p:3.8,color:"#10b981"},{name:"Administradores",n:10,p:0.8,color:"#f59e0b"}];
  return <article className="panel distribution"><div className="panel-heading"><div><h3>Distribución de Usuarios por Rol</h3><p>Desglose de la comunidad educativa registrada</p></div><span className="total-pill">Total: 1,248</span></div>{rows.map(r=><div className="bar-row" key={r.name}><div className="bar-label"><i style={{background:r.color}}/>{r.name}<span>{r.n.toLocaleString("es-MX")} ({r.p}%)</span></div><div className="bar-track"><div style={{width:`${r.p}%`,background:r.color}}/></div></div>)}</article>;
}

function Dashboard() {
  return <div className="content">
    <div className="page-heading"><div><span className="eyebrow blue">PANEL DE CONTROL</span><h1>Resumen General</h1><p>Vista general de la actividad académica de LIMD.</p></div><span className="date-chip"><CalendarDays size={15}/> Ciclo 2026 - A</span></div>
    <div className="stats-grid">
      <StatCard label="TOTAL USUARIOS" value="1,248" note="↑ 12.5% vs. mes anterior" icon={Users} tone="purple" trend/>
      <StatCard label="DOCENTES ACTIVOS" value="48" note="100% carga horaria asignada" icon={GraduationCap} tone="violet"/>
      <StatCard label="ESTUDIANTES" value="920" note="↑ 8.8% matrícula al día" icon={UserRound} tone="green" trend/>
      <StatCard label="ASIGNATURAS" value="36" note="3 nuevas académicas" icon={BookOpen} tone="orange"/>
    </div>
    <div className="dashboard-middle"><StatCard label="GRUPOS ACTIVOS" value="28" note="Promedio 23 alumnos/grupo" icon={ClipboardList} tone="green"/><Distribution/></div>
    <div className="dashboard-bottom">
      <article className="panel activity"><div className="panel-heading"><div><h3>Actividad Reciente</h3><p>Últimos movimientos en la plataforma</p></div><MoreHorizontal size={19}/></div>
        {[["Nueva práctica publicada: Lógica Proposicional - Tablas de verdad","Hace 25 minutos",ClipboardList],["Se creó el grupo “Matemáticas Discretas 2A”","Hace 1 hora",Users],["Dra. Elena Rodríguez asignó práctica a Matemáticas Discretas 2A","Hace 2 horas",BookOpen]].map(([a,b,I])=><div className="activity-row" key={a}><div className="activity-icon"><I size={17}/></div><div><b>{a}</b><small>{b}</small></div></div>)}
      </article>
      <article className="panel period"><div className="panel-heading"><div><h3>Estado del Periodo Lectivo</h3><p>Semestre 1 · Ciclo 2026</p></div></div><div className="progress-box"><div><b>Avance del trimestre</b><strong>65%</strong></div><div className="progress-track"><i/></div><small>Quedan 25 días para el cierre del curso.</small></div><h4>ACCIONES RÁPIDAS</h4><div className="quick-actions"><button><Plus size={15}/> Registrar usuario</button><button><Users size={15}/> Nuevo grupo</button><button><ChartNoAxesCombined size={15}/> Generar reporte</button></div></article>
    </div>
  </div>;
}

function RoleTag({ role }) {
  return <span className={`role-tag ${role.toLowerCase().replaceAll(" ","-")}`}>{role}</span>;
}

function AccountModal({ onClose, onSave, user }) {
  const [name,setName]=useState(user?.name || "");
  const [email,setEmail]=useState(user?.email || "");
  const [role,setRole]=useState(user?.role || "Docente");
  const [status,setStatus]=useState(user?.status || "Activo");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  function submit(e){e.preventDefault();if(!name.trim()||!email.trim()){setError("Completa el nombre y el correo.");return;}onSave({name,email,role,status});}
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><form className="modal-card" onSubmit={submit}>
    <div className="modal-head"><div><span className="eyebrow blue">ADMINISTRACIÓN</span><h2>{user?"Editar cuenta":"Crear Nueva Cuenta"}</h2><p>Registra los datos de acceso del usuario.</p></div><button type="button" className="icon-button" onClick={onClose}><X/></button></div>
    <label>Nombre completo</label><input className="text-input" placeholder="Ej. Prof. Roberto Gómez" value={name} onChange={e=>setName(e.target.value)}/>
    <label>Correo electrónico</label><input className="text-input" type="email" placeholder="correo@institucion.edu.mx" value={email} onChange={e=>setEmail(e.target.value)}/>
    <div className="two-fields"><div><label>Rol asignado</label><select className="text-input" value={role} onChange={e=>setRole(e.target.value)}><option>Administrador</option><option>Docente</option><option>Estudiante</option><option>Tutor</option></select></div><div><label>Estado de cuenta</label><select className="text-input" value={status} onChange={e=>setStatus(e.target.value)}><option>Activo</option><option>Inactivo</option></select></div></div>
    {!user && <><label>Contraseña inicial</label><input className="text-input" type="password" placeholder="Mínimo 8 caracteres" value={password} onChange={e=>setPassword(e.target.value)}/><small className="field-hint">En esta maqueta, la contraseña no se almacena ni se envía.</small></>}
    {error && <p className="form-error">{error}</p>}
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button" type="submit"><Check size={16}/>{user?"Guardar cambios":"Guardar cuenta"}</button></div>
  </form></div>;
}

function Accounts({ users, setUsers }) {
  const [query,setQuery]=useState("");
  const [role,setRole]=useState("Todos los roles");
  const [status,setStatus]=useState("Todos los estados");
  const [modal,setModal]=useState(false);
  const [editing,setEditing]=useState(null);
  const [page,setPage]=useState(1);
  const filtered=useMemo(()=>users.filter(u=>(u.name.toLowerCase().includes(query.toLowerCase())||u.email.toLowerCase().includes(query.toLowerCase()))&&(role==="Todos los roles"||u.role===role)&&(status==="Todos los estados"||u.status===status)),[users,query,role,status]);
  function save(data){if(editing){setUsers(prev=>prev.map(u=>u.id===editing.id?{...u,...data,initials:data.name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}:u));}else{setUsers(prev=>[{...data,id:Date.now(),initials:data.name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase(),last:"Nunca"} ,...prev]);}setModal(false);setEditing(null);}
  function remove(id){if(window.confirm("¿Deseas eliminar esta cuenta de la lista?"))setUsers(prev=>prev.filter(u=>u.id!==id));}
  return <div className="content">
    <div className="page-heading"><div><span className="eyebrow blue">ACADÉMICO</span><h1>Gestión de Cuentas</h1><p>Administra accesos, roles y estados de los usuarios del sistema.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setModal(true)}}><Plus size={17}/> Crear Nueva Cuenta</button></div>
    <section className="panel account-panel">
      <div className="account-title"><div><h3>Directorio General de Cuentas</h3><p>Administra los perfiles registrados en LIMD.</p></div><span className="count-pill">{filtered.length} registros</span></div>
      <div className="filters"><div className="search-field"><Search size={16}/><input placeholder="Buscar por nombre o correo" value={query} onChange={e=>{setQuery(e.target.value);setPage(1)}}/></div><div className="select-wrap"><Filter size={15}/><select value={role} onChange={e=>setRole(e.target.value)}><option>Todos los roles</option><option>Administrador</option><option>Docente</option><option>Estudiante</option><option>Tutor</option></select><ChevronDown size={14}/></div><div className="select-wrap"><Filter size={15}/><select value={status} onChange={e=>setStatus(e.target.value)}><option>Todos los estados</option><option>Activo</option><option>Inactivo</option></select><ChevronDown size={14}/></div></div>
      <div className="table-scroll"><table><thead><tr><th>USUARIO</th><th>ROL</th><th>ESTADO</th><th>ÚLTIMO ACCESO</th><th>ACCIONES</th></tr></thead><tbody>
        {filtered.map(u=><tr key={u.id}><td><div className="person-cell"><div className="person-avatar">{u.initials}</div><div><b>{u.name}</b><small>{u.email}</small></div></div></td><td><RoleTag role={u.role}/></td><td><span className={`status ${u.status.toLowerCase()}`}><i/>{u.status}</span></td><td className="last-access">{u.last}</td><td><div className="row-actions"><button title="Editar" onClick={()=>{setEditing(u);setModal(true)}}><Pencil size={16}/></button><button title="Eliminar" onClick={()=>remove(u.id)}><Trash2 size={16}/></button></div></td></tr>)}
        {filtered.length===0&&<tr><td colSpan="5" className="empty-state">No se encontraron cuentas con esos filtros.</td></tr>}
      </tbody></table></div>
      <div className="table-footer"><span>Mostrando {filtered.length} cuentas</span><div className="pagination"><button disabled><ChevronLeft size={16}/></button><button className="current">1</button><button disabled><ChevronRight size={16}/></button></div></div>
    </section>
    {modal&&<AccountModal user={editing} onClose={()=>{setModal(false);setEditing(null)}} onSave={save}/>}
  </div>;
}

function AdminDirectory({ title, subtitle, initialRows, columns, addLabel = "Agregar registro" }) {
  const [rows, setRows] = useState(initialRows);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const visible = rows.filter(row => Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()));
  function addRow(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setRows(prev => [{ id: Date.now(), [columns[0].key]: name, [columns[1].key]: detail || "Por definir" }, ...prev]);
    setName(""); setDetail(""); setShowForm(false);
  }
  function removeRow(id) {
    if (window.confirm("¿Deseas eliminar este registro de la lista?")) setRows(prev => prev.filter(row => row.id !== id));
  }
  return <div className="content">
    <div className="page-heading"><div><span className="eyebrow blue">ADMINISTRACIÓN ACADÉMICA</span><h1>{title}</h1><p>{subtitle}</p></div><button className="primary-button" onClick={()=>setShowForm(v=>!v)}><Plus size={17}/>{addLabel}</button></div>
    {showForm && <form className="panel inline-form" onSubmit={addRow}><div><label>{columns[0].label}</label><input className="text-input" value={name} onChange={e=>setName(e.target.value)} placeholder={`Escribe ${columns[0].label.toLowerCase()}`} required/></div><div><label>{columns[1].label}</label><input className="text-input" value={detail} onChange={e=>setDetail(e.target.value)} placeholder={`Escribe ${columns[1].label.toLowerCase()}`}/></div><button className="primary-button" type="submit"><Check size={16}/> Guardar</button><button className="secondary-button" type="button" onClick={()=>setShowForm(false)}>Cancelar</button></form>}
    <section className="panel account-panel"><div className="account-title"><div><h3>Directorio de {title.toLowerCase()}</h3><p>{subtitle}</p></div><span className="count-pill">{visible.length} registros</span></div><div className="filters one-filter"><div className="search-field"><Search size={16}/><input placeholder="Buscar registro..." value={search} onChange={e=>setSearch(e.target.value)}/></div></div><div className="table-scroll"><table><thead><tr>{columns.map(col=><th key={col.key}>{col.label.toUpperCase()}</th>)}<th>ACCIONES</th></tr></thead><tbody>{visible.map(row=><tr key={row.id}>{columns.map(col=><td key={col.key}>{row[col.key]}</td>)}<td><div className="row-actions"><button title="Eliminar" onClick={()=>removeRow(row.id)}><Trash2 size={16}/></button></div></td></tr>)}{visible.length===0&&<tr><td colSpan={columns.length+1} className="empty-state">No se encontraron registros.</td></tr>}</tbody></table></div><div className="table-footer"><span>Mostrando {visible.length} registros</span></div></section>
  </div>;
}

function AcademicStructure() {
  const [tab,setTab] = useState("Asignaturas");
  const datasets = {
    "Asignaturas": { columns:[{key:"name",label:"Asignatura"},{key:"code",label:"Clave"}], rows:[{id:1,name:"Matemáticas Discretas",code:"MD-101"},{id:2,name:"Lógica Computacional",code:"LC-102"},{id:3,name:"Estructuras de Datos",code:"ED-201"}] },
    "Periodos": { columns:[{key:"name",label:"Periodo"},{key:"dates",label:"Fechas"}], rows:[{id:1,name:"2026 - A",dates:"Enero – Junio 2026"},{id:2,name:"2026 - B",dates:"Agosto – Diciembre 2026"}] },
    "Grupos": { columns:[{key:"name",label:"Grupo"},{key:"subject",label:"Asignatura"}], rows:[{id:1,name:"9A",subject:"Matemáticas Discretas"},{id:2,name:"9B",subject:"Matemáticas Discretas"},{id:3,name:"8A",subject:"Lógica Computacional"}] }
  };
  const data = datasets[tab];
  return <div className="content"><div className="page-heading"><div><span className="eyebrow blue">ADMINISTRACIÓN ACADÉMICA</span><h1>Asignaturas, periodos y grupos</h1><p>Organiza la estructura académica de la plataforma.</p></div></div><div className="tabs">{Object.keys(datasets).map(t=><button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{t}</button>)}</div><AdminDirectory key={tab} title={tab} subtitle={`Consulta y administra ${tab.toLowerCase()} registrados.`} initialRows={data.rows} columns={data.columns} addLabel={`Agregar ${tab.slice(0,-1).toLowerCase()}`}/></div>;
}

function GeneralSettings() {
  const [settings,setSettings] = useState({platform:true, notifications:true, maintenance:false, registration:false});
  const options = [
    ["platform","Plataforma habilitada","Permite el acceso general al sistema."],
    ["notifications","Notificaciones académicas","Habilita avisos sobre prácticas y actividades."],
    ["maintenance","Modo mantenimiento","Muestra un aviso de mantenimiento a los usuarios."],
    ["registration","Registro público","Permite solicitar cuentas desde la pantalla de acceso."]
  ];
  return <div className="content"><div className="page-heading"><div><span className="eyebrow blue">ADMINISTRACIÓN</span><h1>Configuración General</h1><p>Controla las opciones generales de funcionamiento de LIMD.</p></div><span className="date-chip"><Settings size={15}/> Preferencias</span></div><section className="panel settings-panel"><div className="panel-heading"><div><h3>Preferencias del sistema</h3><p>Los cambios se aplican a esta sesión de demostración.</p></div></div>{options.map(([key,title,desc])=><div className="setting-row" key={key}><div><b>{title}</b><small>{desc}</small></div><button className={`switch ${settings[key]?"on":""}`} role="switch" aria-checked={settings[key]} onClick={()=>setSettings(s=>({...s,[key]:!s[key]}))}><i/></button></div>)}</section><div className="settings-note"><ShieldCheck size={17}/> La configuración real se guardará cuando conectemos la base de datos y el backend.</div></div>;
}

function SimplePage({ title }) {
  if(title==="Docentes y Estudiantes") return <AdminDirectory title={title} subtitle="Consulta y administra los perfiles académicos de docentes y estudiantes." initialRows={[
    {id:1,nombre:"Prof. Carlos Mendoza",tipo:"Docente",correo:"carlos@limd.edu.mx"},
    {id:2,nombre:"Profa. Ana María Torres",tipo:"Docente",correo:"ana.torres@limd.edu.mx"},
    {id:3,nombre:"Mateo Fernández",tipo:"Estudiante",correo:"mateo.fdz@limd.edu.mx"},
    {id:4,nombre:"Sofía Benítez",tipo:"Estudiante",correo:"sofia.b@limd.edu.mx"}
  ]} columns={[{key:"nombre",label:"Nombre"},{key:"tipo",label:"Tipo"},{key:"correo",label:"Correo"}]} addLabel="Agregar persona"/>;
  if(title==="Asignaturas y Grupos") return <AcademicStructure/>;
  if(title==="Configuración General") return <GeneralSettings/>;
  return <div className="content"><div className="page-heading"><div><span className="eyebrow blue">LIMD</span><h1>{title}</h1><p>Selecciona una sección del menú para administrar la plataforma.</p></div></div></div>;
}

export default function App() {
  const [logged,setLogged]=useState(false);
  const [page,setPage]=useState("Resumen / Inicio");
  const [mobileOpen,setMobileOpen]=useState(false);
  const [users,setUsers]=useState(initialUsers);
  if(!logged)return <Login onLogin={()=>setLogged(true)}/>;
  return <div className="app-shell"><Sidebar page={page} setPage={setPage} onLogout={()=>setLogged(false)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/><main className="main-area"><Topbar title={page} setMobileOpen={setMobileOpen}/>{page==="Resumen / Inicio"?<Dashboard/>:page==="Gestión de Cuentas"?<Accounts users={users} setUsers={setUsers}/>:<SimplePage title={page}/>}</main></div>;
}
