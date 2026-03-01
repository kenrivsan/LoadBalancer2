import { useMemo, useState } from "react";
import "./App.css";

type Movimiento = {
  id: string;
  fecha: string; // YYYY-MM-DD
  descripcion: string;
  categoria: "Ingresos" | "Comida" | "Transporte" | "Entretenimiento" | "Otros";
  monto: number; // positivo ingresos, negativo gastos
};

function formatearMoneda(valor: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    maximumFractionDigits: 2,
  }).format(valor);
}

function barraPorcentaje(p: number) {
  const v = Math.max(0, Math.min(100, p));
  return `${v}%`;
}

export default function App() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<"Todas" | Movimiento["categoria"]>("Todas");

  const movimientos: Movimiento[] = useMemo(
    () => [
      { id: "m1", fecha: "2026-02-20", descripcion: "Pago de proyecto", categoria: "Ingresos", monto: 2500 },
      { id: "m2", fecha: "2026-02-21", descripcion: "Supermercado", categoria: "Comida", monto: -320.5 },
      { id: "m3", fecha: "2026-02-22", descripcion: "Uber", categoria: "Transporte", monto: -78 },
      { id: "m4", fecha: "2026-02-23", descripcion: "Cine", categoria: "Entretenimiento", monto: -95 },
      { id: "m5", fecha: "2026-02-24", descripcion: "Café", categoria: "Comida", monto: -28.5 },
      { id: "m6", fecha: "2026-02-25", descripcion: "Internet", categoria: "Otros", monto: -210 },
    ],
    []
  );

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return movimientos.filter((m) => {
      const coincideTexto =
        q === "" ||
        m.descripcion.toLowerCase().includes(q) ||
        m.categoria.toLowerCase().includes(q) ||
        m.fecha.includes(q);

      const coincideCategoria = categoria === "Todas" || m.categoria === categoria;

      return coincideTexto && coincideCategoria;
    });
  }, [movimientos, busqueda, categoria]);

  const totalIngresos = useMemo(
    () => movimientos.filter((m) => m.monto > 0).reduce((acc, m) => acc + m.monto, 0),
    [movimientos]
  );

  const totalGastos = useMemo(
    () => movimientos.filter((m) => m.monto < 0).reduce((acc, m) => acc + Math.abs(m.monto), 0),
    [movimientos]
  );

  const balance = totalIngresos - totalGastos;

  const metaAhorro = 1200;
  const ahorroActual = Math.max(0, balance);
  const progreso = Math.round((ahorroActual / metaAhorro) * 100);

  return (
    <div className="pagina">
      <header className="encabezado">
        <div className="marca">
          <div className="logo">GT</div>
          <div>
            <h1>Gestor de Gastos</h1>
            <p>Panel estático (Vite + React + TS) listo para Docker</p>
          </div>
        </div>

        <div className="acciones">
          <button className="btn btn-secundario" type="button">
            Exportar (demo)
          </button>
          <button className="btn" type="button">
            Nuevo movimiento
          </button>
        </div>
      </header>

      <main className="contenedor">
        <section className="grid-resumen">
          <article className="tarjeta">
            <div className="tarjeta-titulo">Ingresos</div>
            <div className="tarjeta-valor">{formatearMoneda(totalIngresos)}</div>
            <div className="tarjeta-detalle">Últimos 30 días (demo)</div>
          </article>

          <article className="tarjeta">
            <div className="tarjeta-titulo">Gastos</div>
            <div className="tarjeta-valor">{formatearMoneda(totalGastos)}</div>
            <div className="tarjeta-detalle">Incluye suscripciones (demo)</div>
          </article>

          <article className="tarjeta">
            <div className="tarjeta-titulo">Balance</div>
            <div className={`tarjeta-valor ${balance >= 0 ? "positivo" : "negativo"}`}>
              {formatearMoneda(balance)}
            </div>
            <div className="tarjeta-detalle">Objetivo: mantenerlo positivo</div>
          </article>

          <article className="tarjeta tarjeta-meta">
            <div className="tarjeta-titulo">Meta de ahorro</div>
            <div className="tarjeta-valor">{formatearMoneda(metaAhorro)}</div>

            <div className="barra">
              <div className="barra-relleno" style={{ width: barraPorcentaje(progreso) }} />
            </div>
            <div className="tarjeta-detalle">
              Progreso: <b>{Math.min(100, Math.max(0, progreso))}%</b> — Ahorro actual:{" "}
              <b>{formatearMoneda(ahorroActual)}</b>
            </div>
          </article>
        </section>

        <section className="panel">
          <div className="panel-encabezado">
            <div>
              <h2>Movimientos recientes</h2>
              <p>Filtrá por texto o categoría (todo estático).</p>
            </div>

            <div className="filtros">
              <input
                className="input"
                placeholder="Buscar: fecha, categoría o descripción…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <select className="select" value={categoria} onChange={(e) => setCategoria(e.target.value as any)}>
                <option value="Todas">Todas</option>
                <option value="Ingresos">Ingresos</option>
                <option value="Comida">Comida</option>
                <option value="Transporte">Transporte</option>
                <option value="Entretenimiento">Entretenimiento</option>
                <option value="Otros">Otros</option>
              </select>
            </div>
          </div>

          <div className="tabla-wrap">
            <table className="tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th className="derecha">Monto</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((m) => (
                  <tr key={m.id}>
                    <td>{m.fecha}</td>
                    <td>{m.descripcion}</td>
                    <td>
                      <span className={`etiqueta etiqueta-${m.categoria.toLowerCase()}`}>{m.categoria}</span>
                    </td>
                    <td className={`derecha ${m.monto >= 0 ? "positivo" : "negativo"}`}>
                      {formatearMoneda(m.monto)}
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan={4} className="vacio">
                      No hay resultados con ese filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="panel-footer">
            <span className="punto" /> Datos de ejemplo — Ideal para mostrar en captura y dockerizar.
          </footer>
        </section>
      </main>

      <footer className="pie">
        <span>Assignment-04 • UI estática</span>
        <span>Hecho con Vite + React + TypeScript</span>
      </footer>
    </div>
  );
}