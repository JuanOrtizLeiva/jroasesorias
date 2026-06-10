# BLUEPRINT FINAL — Rediseño jroasesorias.cl (v2, reconciliado)

---

## 0. Qué cambió respecto a v1 (resumen de la reconciliación)

La crítica acierta en el núcleo: v1 curaba el *decaimiento estético* pero dejaba sin responder las tres preguntas que deciden la compra. v2 las responde en pantalla:

| Pregunta del comprador | Respuesta en v2 |
|---|---|
| ¿Quién más les ha pagado? | Historia de origen contada de frente (S6) + artefactos **reales** anonimizados, no mockups + especificidad chilena como prueba de expertise (S2) |
| ¿Cuánto cuesta y cómo se cobra? | Módulo "Cómo se trabaja con nosotros" (S7): modelo de engagement, precio cerrado antes de empezar, mensualidad de Operación con SLA |
| ¿Qué pasa si el consultor desaparece? | Continuidad explícita en S7: código + documentación + accesos en propiedad del cliente desde el día uno, SLA de Operación |

Objeciones de la crítica **aceptadas e integradas**: P1 (artefactos reales, no mockups), P2 (publicar el mapa de muestra), P3 (calendario directo + verbo único «Agendar»), P4 (la tesis "primero tubería" pasa a ser el mecanismo del Método), P5 (engagement/continuidad/reversión de riesgo), P6 (chilenizar), P7 (nuevo H1), P8 (origen de frente), P9 (lead magnet definido), P10 (partitura del cierre + eliminar chatbot), P11 (spec mobile 390px), P12 (medición), P13 (off-page).

Objeción **matizada**: "cliente cero circular". No se esconde ni se infla: se convierte en relato de origen honesto («construimos esto para operar nuestro propio grupo; otras empresas empezaron a pedírnoslo»). La circularidad escondida es debilidad; la circularidad declarada es origen. Regla dura derivada: **los casos anónimos solo existen si son reales y de terceros; si no los hay, la sección vive de la historia de origen + artefactos, y no se inventa NADA** (restricción de marca intacta).

---

## 1. Tesis del rediseño (v2)

**La página deja de describir y empieza a demostrar — con artefactos reales del sistema que opera el propio grupo, con el entregable del diagnóstico publicado a la vista, y con las tres preguntas duras del comprador (quién, cuánto, qué pasa si) respondidas antes del formulario. El cierre es el segundo hero.**

### La Gran Idea (reemplaza «hacer hablar los datos»)

La tesis diferenciadora real es la regla anti-hype: **primero la tubería, después la IA**. Esa idea abre la página, estructura el método y cierra la venta.

- **H1 propuesto:** «Primero la tubería. *Después la IA.*»
  - Subtítulo: «Automatizamos el cierre, la cobranza y el reporting de empresas en Chile. Cuando sus datos corren solos, recién entonces hablamos de inteligencia artificial.»
- Alternativas (elegir UNA, testear): «Su cierre de mes debería correr solo. *Lo demás viene después.*» / «Deje de armar la cifra. *Empiece a decidir con ella.*»
- El statement de S8 (que la crítica reconoció superior) se conserva como eco final: hero plantea la regla → cierre plantea la consecuencia competitiva.

---

## 2. Principios rectores (v2, con dientes nuevos)

- **P1' — Artefacto REAL o nada.** Cada sección de venta lleva un artefacto: captura real del sistema en producción del grupo con datos enmascarados (blur/sustitución), o demo con datos sintéticos **declarados como tales** en un caption («Datos de demostración»). Prohibido el mockup "fake-real" estilo template de admin: lee como engaño y destruye P1.
- **P2 — Peak-end** (se mantiene): las dos últimas pantallas reciben tanto arte como el hero; la página termina más fuerte de lo que empieza.
- **P3 — Escalada de objeciones** (se mantiene), con dos peldaños nuevos: precio/modelo y continuidad ANTES del cierre.
- **P4' — Prueba honesta:** método con mecanismo (no genérico), origen declarado, especificidad chilena como sustituto de logos, rostro + LinkedIn del consultor. **Cero "por eso no verá logos"** — no se planta la duda que el visitante no tenía.
- **P5 — Ritmo de partitura** (se mantiene): nunca fondo+layout repetidos consecutivos, incluido el tramo final (corregido en v2).
- **P6 — Voz de gerencia sostenida** (se mantiene): purga total del registro low-ticket; «sin costo» aparece **una sola vez** en toda la página (la insistencia en lo gratis huele a desesperación).
- **P7' — Verbo único «Agendar» + escalera de dos peldaños:** primario «Agendar diagnóstico de 30 minutos» (abre **calendario con horas reales** — Calendly o equivalente; el formulario es fallback, no destino). Secundario de baja fricción definido: «Descargar un mapa de oportunidades de muestra» (lead magnet, captura al 95% no listo).
- **P8 (nuevo) — Promesa calibrada:** nada que la operación no pueda cumplir. El mapa de oportunidades NO sale de la reunión de 30 minutos: «en la reunión levantamos su operación; el mapa llega por escrito dentro de 72 horas». Honestidad como rasgo de marca.

---

## 3. Estructura definitiva, sección por sección

Curva objetivo: **Hero 9 → Espejo 7 → Servicios 8 → Respiro 7 → Método 9 → Origen 8 → Condiciones 8 → Cierre 10** (footer integrado al cierre, sin descenso final).

---

### S1 — HERO (fondo oscuro #15110E, foto a sangre — se conserva la factura)
- **H1:** «Primero la tubería. *Después la IA.*» (Fraunces display, itálica en la segunda línea; entrada on-load por líneas, fade+rise — única animación de carga).
- **CTA primario:** «Agendar diagnóstico de 30 minutos» → abre widget de calendario (modal). Microcopy: «Sin costo. Si no podemos ayudarle, se lo decimos en la primera reunión.» *(única mención de "sin costo" en la página).*
- **CTA secundario (ghost):** «Ver un mapa de oportunidades de muestra» → ancla a S8 o modal de descarga con email.
- Parallax sutil de la foto (≤10%, CSS puro). La sección siguiente solapa el hero con margin-top negativo en desktop (la costura hero→cuerpo es la primera prueba de que la página no decae).
- **Mobile (390px):** sin solapamiento; display clamp piso 36px; CTA primario full-width visible sin scroll.

### S2 — EL ESPEJO, CHILENIZADO (papel #F4F2EC, columna ancha, tipografía protagonista)
- **H2:** «Su empresa ya tiene los datos. Lo que no tiene es la respuesta.»
- Síntomas con numeración bronce (reveal escalonado, scaleX en la numeración) — **anclados en la operación chilena**, esa especificidad ES la prueba sin logos:
  1. «El cierre del mes vive en una planilla que alguien arma a mano un viernes a las siete de la tarde — cruzando el ERP con los DTE del SII, fila por fila.»
  2. «La conciliación bancaria sigue siendo una persona con dos pestañas abiertas, marcando con color.»
  3. «Cada gerente llega al comité con su propia versión de la cifra, y la reunión se gasta en discutir cuál es la verdadera.»
  4. «El dashboard que mandó a hacer el año pasado nadie lo abre. Porque nadie confía en lo que muestra.» *(el síntoma asesino: desactiva al competidor "ya compré BI").*
- Mención natural de stack local en el cuerpo: «Da lo mismo si su ERP es Softland, Defontana, Nubox o una planilla con nombre de ERP: el problema es el mismo — los datos llegan, pero no conversan.»
- **Puente serif:** «La pregunta no es si su empresa tiene datos. Es quién está decidiendo con ellos.»

### S3 — SERVICIOS COMO ESCENAS (claro/alt, zigzag texto↔artefacto, NUNCA grilla)
- **H2:** «Lo que cambia cuando los datos corren solos.» *(reemplaza «…dejar de operar a ciegas», que insultaba al comprador).*
- 3 servicios, cada uno = eyebrow + titular-outcome + escena (situación → intervención → nueva realidad) + **artefacto real al lado**:
  - **Datos / Reporting** — escena: «Es lunes, 8 AM. El gerente de finanzas abre un panel que ya consolidó las ventas del fin de semana desde el ERP. Nadie transcribió nada. Nadie pidió la planilla por correo.» Artefacto: **captura real del panel financiero que opera el grupo**, cifras enmascaradas, caption «Sistema en producción — datos enmascarados».
  - **Automatización** — escena de cobranza/conciliación. Artefacto: **diagrama SVG propio** del flujo real (ERP + cartola + DTE → tubería → panel), estilo de la casa, no clipart.
  - **IA aplicada** — subordinada a la Gran Idea: «La IA llega al final, cuando hay tubería que la alimente. Antes de eso, es un chatbot caro.» Artefacto: fragmento real anonimizado (extracto de pipeline o de un informe generado), declarado.
- Sustitución obligatoria de la cifra inventada (l.459): «Las planillas que su equipo consolida a mano cada semana dejan de existir.»
- **CTA intermedio #1:** «Agendar diagnóstico de 30 minutos» (mismo verbo, mismo destino-calendario).
- Artefactos invaden la sección siguiente (margin-bottom negativo + z-index) **solo en desktop**; en mobile el zigzag apila artefacto-primero, texto después.
- **Puente serif:** «Nada de esto parte por la tecnología. Parte por una regla.»

### S4 — RESPIRO: LA REGLA (45–50vh, oscuro #15110E + grano SVG 2–3%, una sola frase display)
- **Copy:** «Una empresa que cierra su mes copiando datos entre cinco planillas no tiene un problema de IA. Tiene un problema de tubería. *Por eso tenemos una regla.*»
- Ya no es frase decorativa: es el **anuncio del mecanismo** que S5 operacionaliza. Línea bronce que se dibuja (scaleX) bajo la frase.

### S5 — EL MÉTODO JRO (clímax 1, continúa el oscuro, sección más densa y trabajada)
- **H2 display:** «No tocamos IA hasta que su cierre de mes corra solo.»
- Sub: «Esa regla ordena el método completo. Tres fases, cada una con un entregable que es suyo, siga o no con nosotros.»
- Diagrama horizontal propio (fases que se encienden secuencialmente al scroll, conectores scaleX) — **la regla aparece como compuerta dibujada entre Diseño y la capa de IA**: el diagrama mismo demuestra el foso.
  1. **Diagnóstico** — 30 minutos de reunión. Entregable: «Un mapa priorizado de oportunidades, por escrito, dentro de 72 horas. Suyo, decida o no seguir.» *(promesa calibrada — resuelve la sobrepromesa de v1).*
  2. **Diseño e implementación** — 2 a 4 semanas. Entregable: «Un tablero que su gerente abre cada mañana. No un PDF de 80 páginas.»
  3. **Operación** — permanente, mensualidad fija. Entregable: «El sistema mantenido, monitoreado y mejorado, con compromiso de respuesta por escrito.»
- **CTA intermedio #2** (momento Aagaard: el visitante ya entiende el mecanismo).
- **Puente serif:** «El método es nuestro. Lo primero que hicimos con él fue usarlo en casa.»

### S6 — ORIGEN Y PRUEBA (papel claro — contraste tras dos oscuras)
- **H2:** «Construimos estos sistemas para operar nuestro propio grupo. Después nos los empezaron a pedir.»
- **La historia de frente, no escondida:** «JRO Asesorías nace dentro del **Grupo Duocapital**. Los paneles de finanzas, cobranza y reporting que ofrecemos operan a diario nuestra propia operación financiera y la del **Instituto Tecnipro** (única mención). No le vamos a mostrar un demo: le vamos a mostrar el sistema con el que cerramos nuestro propio mes.» + un artefacto real anonimizado distinto a los de S3.
- **Casos de terceros: SOLO SI EXISTEN.** Si hay casos reales de clientes externos, 1–3 viñetas ricas en contexto (industria + rol + problema + cambio cualitativo, cero cifras), redactadas para **no oler al propio grupo** (rubros distintos a "servicios financieros"). Si no existen aún, la sección vive del origen + artefactos. **Prohibido inventar.** `[INSUMO DEL DUEÑO: confirmar qué casos externos reales se pueden describir]`
- **Rostro + nombre del consultor que atiende el diagnóstico**, una línea de bio operativa, **enlace a su LinkedIn** (la página manda a verificar; que encuentre algo — ver §7 off-page).
- **Puente serif:** «Queda una pregunta razonable: cómo se trabaja con nosotros y qué pasa después.»

### S7 — CÓMO SE TRABAJA CON NOSOTROS (nueva — fondo alt cálido distinto a S2/S6, dos columnas tipográficas, checks bronce, sin tarjetas-icono)
Responde de frente *cuánto, cómo y qué pasa si* — la sección que más confianza compra de toda la página:
- **H2:** «Condiciones claras antes de la primera reunión.»
- **Columna A — El modelo:**
  - «Proyectos de implementación: 2 a 4 semanas, **precio cerrado por escrito antes de empezar**. Sin sorpresas a mitad de camino.» `[INSUMO DEL DUEÑO: si autoriza un rango "desde", se agrega; si no, se mantiene "precio cerrado" sin cifras — nunca inventar]`
  - «Operación: mensualidad fija con compromiso de respuesta (SLA) por escrito.»
  - **Reversión de riesgo con dientes:** «Si a los 30 días de entregado nadie en su empresa abre el tablero, la última cuota no se paga.» `[INSUMO DEL DUEÑO: validar que está dispuesto a sostenerla; si no, omitir — jamás publicar una garantía que no se honrará]`
- **Columna B — Continuidad y confidencialidad:**
  - «El código, la documentación y los accesos quedan **en su propiedad desde el día uno**. Si mañana quiere seguir con otro equipo, puede.» *(la respuesta estructural al bus factor: la dependencia se elimina por diseño, no se promete con un organigrama).*
  - «Trabajamos bajo NDA desde la primera reunión.»
  - «No reemplazamos a su equipo: le quitamos el trabajo que no debería estar haciendo una persona.»
  - Stack nombrado (autoridad por concreción): «Python, PostgreSQL, integraciones con SII/DTE, Softland, Defontana, Nubox, SharePoint.» *(ajustar a lo verdadero).*
  - **Eliminado:** «Por eso no verá logos en esta página» — la confidencialidad se afirma, la ausencia de logos no se explica.
- **Puente serif:** «Eso es todo lo que hay que saber. Lo que sigue es una conversación de 30 minutos.»

### S8 — CIERRE: EL HERO INVERTIDO (clímax 2, oscuro a sangre + grano, footer integrado)
- **Statement display:** «La ventaja no la tendrá quien tenga más datos. *La tendrá quien decida con ellos primero.*» *(eco de la Gran Idea: el hero dio la regla, el cierre da la consecuencia).*
- **Dos vías lado a lado:**
  - **Primaria: widget de calendario embebido** (Calendly o equivalente) — «Agendar diagnóstico de 30 minutos». Si invitas a agendar, se ven horas, no se espera un correo.
  - **Secundaria: formulario de 4 campos** (nombre, email corporativo, empresa, dropdown de desafío) con botón «Agendar diagnóstico» — para quien no quiere calendario. Junto al formulario, garantía real: «Respuesta en menos de 24 horas.»
- **El entregable a la vista (P2):** miniatura hojeable/descargable de un **mapa de oportunidades real anonimizado** — «Esto es exactamente lo que recibirá dentro de 72 horas después de la reunión.» Doble uso: prueba en el cierre + lead magnet (descarga a cambio de email) para el visitante tibio.
- **Módulo «Qué pasa después»:** «1. Conversamos 30 minutos sobre su operación. 2. Dentro de 72 horas recibe un mapa de oportunidades por escrito. 3. Usted decide si avanzamos — sin compromiso.»
- **Eliminado:** recuadro «¿Por qué nuestro correo es @duocapital.cl?». Sustituto: línea discreta «JRO Asesorías es parte del Grupo Duocapital.» (Acción paralela recomendada: correo @jroasesorias.cl.)
- **Footer integrado como banda final del mismo lienzo oscuro** (no sección aparte → se elimina el oscuro+oscuro y el tercer CTA que criticaba el comprador): una sola franja delgada con identidad (JRO — Grupo Duocapital · correo público · Chile/LatAm), link compacto a videos (los Vimeo degradados aquí), links legales mínimos, **© 2026**, **sin botón CTA** — el eco es tipográfico, no insistente.

### ELIMINADO DE LA PÁGINA
- **Chatbot completo** (l.805–960): en consultoría de alto ticket grita "template SaaS"; lo reemplaza el widget de agenda. (Si el dueño insiste en conservarlo: tratamiento «usted», sin emoji, fallback a correo público — pero la recomendación es eliminarlo.)
- Sección #recursos/videos como sección (degradada a link en footer).
- Toda instancia de «Sin complicaciones técnicas», «cualquier persona puede entender», «No necesita ser experto» (l.396, 452, 483, 576, meta l.11).
- «Recupere hasta 10 horas semanales por persona» (l.459 — violación de marca).
- Verbo «Solicitar»: **todas** las instancias pasan a «Agendar» (corrige la autocontradicción de v1).

---

## 4. Sistema visual y motion

**Partitura de fondos (cierre corregido):**
`Hero oscuro → S2 papel (solapa) → S3 claro/alt zigzag → S4+S5 oscuro con grano (un solo movimiento) → S6 papel → S7 alt cálido (tratamiento distinto a S2/S6: dos columnas densas vs columna aireada) → S8 oscuro a sangre con footer-banda integrado.`
Ninguna combinación fondo+layout se repite consecutiva, **incluido el final**.

**Tipografía:** Display Fraunces `clamp(40px, 7vw, 88px)` en exactamente 4 momentos (hero, S4, S5, S8). H2 Fraunces 36–44px, siempre afirmación declarativa. Eyebrow Inter 11–12px uppercase tracking 0.12em bronce sobre cada H2. Cuerpo Inter, párrafos ≤4 líneas; puentes inter-sección Fraunces itálica 20–24px. **Test del discurso:** los H2 leídos en secuencia deben sonar a argumento — «Su empresa ya tiene los datos…» → «Lo que cambia cuando los datos corren solos» → «No tocamos IA hasta que su cierre corra solo» → «Construimos estos sistemas para nuestro grupo…» → «Condiciones claras antes de la primera reunión» → «La ventaja la tendrá quien decida primero». *(Funciona.)*

**Color:** bronce #B08442 solo en picos (CTAs, numeración, líneas scaleX, una palabra clave por sección). Sin gradientes sobre datos.

**Espacio:** secciones de contenido 96–120px; S4 a 45–50vh; S5 densa. Eliminar `--section-y` uniforme.

**Profundidad:** solapamientos (S2 sobre hero; artefactos S3 invadiendo S4) **solo ≥1024px**; grano SVG 2–3% en oscuros; parallax hero ≤10%.

**Motion (un sistema, <1KB):** IntersectionObserver único; `opacity 0→1 + translateY(24px)→0, 0.7s cubic-bezier(0.16,1,0.3,1)`; stagger `calc(var(--i)*120ms)`; líneas bronce scaleX; fases del método encendido secuencial. Solo transform/opacity; todo bajo `prefers-reduced-motion: no-preference`. On-load: solo hero.

**Spec mobile obligatoria (390px):**
- Zigzag → apilado artefacto-primero; sin márgenes negativos ni solapamientos.
- Display: piso 36–40px; verificar que ningún statement parta mal ni empuje el CTA bajo el fold.
- Capturas reales: versión recortada vertical (el panel completo a 390px es ilegible); tap targets ≥44px; widget de calendario en modal full-screen.
- **Criterio de aceptación duplicado:** cada pantalla completa con interés visual a 1366×768 **y** a 390×844.

---

## 5. Producción de artefactos (prerrequisito del rediseño — sin esto no se publica)

1. **2–3 capturas reales** del sistema financiero en producción del grupo, con datos enmascarados (blur selectivo o modo datos-sintéticos), caption honesto «Sistema en producción — datos enmascarados» / «Datos de demostración». *(Estética: la app real usa paleta slate+emerald — el grano auténtico de producción es el punto; enmarcar en chrome de navegador neutro.)*
2. **1 diagrama SVG propio** del flujo de automatización (ERP/cartola/DTE → tubería → panel), dibujado con el sistema visual de la página.
3. **1 mapa de oportunidades real anonimizado** (PDF de 2–3 páginas) — el artefacto más barato y más potente de toda la página (S8 + lead magnet).
4. **Foto + bio + LinkedIn** del consultor que atiende el diagnóstico.

---

## 6. Lista final de cambios sobre index.html

### ALTA (violaciones de marca, prueba, conversión)
1. **l.459:** eliminar «Recupere hasta 10 horas semanales por persona» → «Las planillas que su equipo consolida a mano cada semana dejan de existir.»
2. **Hero:** nuevo H1 («Primero la tubería. *Después la IA.*»), CTA primario → widget de calendario, CTA secundario → mapa de muestra; entrada on-load por líneas.
3. **Integrar Calendly (o equivalente)** como destino de TODOS los CTA primarios; unificar verbo «Agendar» en cada instancia (incluido botón del formulario, l.688–691: «Enviar mensaje» → «Agendar diagnóstico»).
4. **Insertar S2 Espejo chilenizado** entre trust-bar (l.438) y #servicios (l.441), margin-top negativo (desktop).
5. **Reescribir #servicios (l.441–475)** a zigzag escena+artefacto con capturas reales anonimizadas (NO mockups); eliminar Font Awesome como ilustración; CTA intermedio al cierre.
6. **Reconstruir #metodologia (l.511–545)** como Método JRO con la regla-compuerta («No tocamos IA hasta que su cierre corra solo»), entregables literales por fase, promesa del mapa a 72 horas, fondo oscuro display, CTA intermedio.
7. **Insertar S7 «Cómo se trabaja con nosotros»** (modelo, precio cerrado, SLA de Operación, propiedad del código, NDA, reversión de riesgo) — requiere validación previa del dueño en los dos puntos marcados `[INSUMO DEL DUEÑO]`.
8. **Rediseñar #contacto (l.621–695)** como hero invertido: statement + calendario embebido + formulario secundario + mapa de muestra visible + «Qué pasa después»; **eliminar explainer @duocapital.cl (l.647–655)** → línea «JRO Asesorías es parte del Grupo Duocapital.»
9. **Purga de registro low-ticket** (l.396, 452, 483, 576, meta l.11) y reducción de «sin costo» a UNA aparición (microcopy del hero).
10. **Reescribir todos los H2** (l.445, 482, 515, 585, 625) según §3; verificar el test del discurso.

### MEDIA (ritmo, origen, cierre)
11. **Reconvertir Credibilidad (l.548–578)** en S6 Origen: historia de frente, artefacto real, Tecnipro a UNA mención, rostro+LinkedIn del consultor; casos de terceros solo si son reales y verificados con el dueño.
12. **Eliminar #recursos (l.581–618)**; videos → link compacto en footer.
13. **Footer (l.698–733):** banda integrada al lienzo de S8, sin CTA, identidad mínima, **© 2025 → 2026**.
14. **Insertar S4 respiro** (45–50vh) conectado al método; grano SVG en fondos oscuros; romper `--section-y`; verificación display a 1366×768 **y** 390px.
15. **Eliminar el chatbot (l.805–960)**; su lugar lo ocupa el acceso flotante discreto al calendario (opcional).
16. **Lead magnet operativo:** endpoint simple de captura email→envío del mapa de muestra (puede ser mailto inicial + envío manual mientras no haya backend).

### BAJA (craft, medición, off-page)
17. **Plan de medición:** eventos de clic por CTA (con sección de origen), scroll depth 25/50/75/100, envíos de formulario y agendamientos (Plausible o GA4). **Criterio de éxito a 60 días: tasa de diagnósticos agendados por visita**, no la sensación del scroll.
18. **Higiene off-page:** completar LinkedIn del consultor (enlazado desde S6), crear ficha Google Business de JRO Asesorías — el gerente va a googlear antes de agendar.
19. **Dominio de correo @jroasesorias.cl** para eliminar de raíz la objeción del dominio.
20. Parallax hero + indicador de scroll por transform.

---

## 7. Criterio de aceptación global (v2)

(a) Los H2 leídos en secuencia suenan a discurso de venta; (b) cada pantalla completa tiene un elemento de interés visual **a 1366×768 y a 390×844**; (c) ninguna combinación fondo+layout se repite consecutiva, incluido el cierre; (d) **cero cifras inventadas y cero nombres de clientes** (marcas propias permitidas: Grupo Duocapital, Instituto Tecnipro); (e) las tres preguntas del comprador — *¿quién más?, ¿cuánto/cómo se cobra?, ¿qué pasa si el consultor desaparece?* — tienen respuesta visible en pantalla antes del formulario; (f) ningún artefacto es un mockup sin declarar; toda imagen es real-anonimizada o sintética-declarada; (g) el CTA primario abre horas reales de calendario; (h) la instrumentación está activa el día del lanzamiento; (i) la última pantalla es la más fuerte: la página termina mejor de lo que empieza.

**Dependencias del dueño antes de implementar (no bloquean el resto):** confirmar casos externos reales narrables · validar la garantía «si nadie abre el tablero, no paga la última cuota» · decidir si publica rango de precio "desde" real · autorizar capturas anonimizadas del sistema del grupo · foto/bio/LinkedIn del consultor.