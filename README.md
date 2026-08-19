# Mini Desk Store

**Mini Desk Store** es una aplicación móvil desarrollada como prueba técnica utilizando **React Native, Expo y TypeScript**.

La aplicación consume productos desde **Fake Store API** y permite recorrer un flujo completo de compra simulado: desde una pantalla de bienvenida y catálogo de productos hasta el detalle individual, carrito, checkout y confirmación de compra.

El proyecto fue desarrollado con una arquitectura deliberadamente sencilla, priorizando código legible, separación clara de responsabilidades y decisiones técnicas fáciles de justificar y mantener.

---

## Presentación del Proyecto

| Campo                          | Información                       |
| :----------------------------- | :-------------------------------- |
| **Nombre**                     | Angel Abraham Lugo Saenz          |
| **Institución de procedencia** | Instituto Tecnológico de Software |
| **Proyecto**                   | Mini Desk Store                   |
| **Tipo**                       | Prueba técnica mobile             |
| **Plataforma**                 | React Native                      |
| **Framework**                  | Expo                              |
| **Lenguaje**                   | TypeScript                        |
| **Navegación**                 | Expo Router                       |
| **Server State**               | TanStack Query                    |
| **Client State**               | Zustand                           |
| **API**                        | Fake Store API                    |
| **Estado**                     | Funcional                         |

---

## Descripción General

Mini Desk Store simula una pequeña tienda móvil.

El usuario inicia en una pantalla de bienvenida y puede acceder al catálogo de productos. Los productos son obtenidos desde Fake Store API y se muestran considerando los diferentes estados de una petición remota:

```text
Loading
Error
Success
```

Desde el catálogo es posible abrir cualquier producto y navegar a una pantalla de detalle utilizando una ruta dinámica basada en su identificador.

La aplicación también cuenta con un carrito global sincronizado entre las diferentes pantallas, controles para aumentar o disminuir cantidades y un flujo de checkout simulado.

Flujo principal:

```text
Welcome
   ↓
Catalog
   ↓
Product Detail
   ↓
Cart
   ↓
Checkout
   ↓
Success
```

---

## Funcionalidades Implementadas

### Pantalla de bienvenida

La ruta inicial de la aplicación muestra una pantalla de bienvenida con una acción para ingresar al catálogo.

```text
/
↓
Welcome Screen
↓
Go to Catalog
↓
/catalog
```

La navegación hacia el catálogo utiliza Expo Router.

---

### Catálogo de productos

La aplicación obtiene los productos desde:

```text
https://fakestoreapi.com/products
```

El catálogo muestra información como:

```text
- Imagen.
- Categoría.
- Nombre del producto.
- Precio.
- Rating.
- Controles de cantidad.
```

Para representar el listado se utiliza `FlatList`, evitando renderizar todos los elementos de manera innecesaria.

---

### Estados de carga, error y éxito

La consulta del catálogo maneja explícitamente los tres estados principales de una petición remota.

#### Loading

Mientras se espera la respuesta de Fake Store API se muestra:

```text
Loading products...
```

junto con un `ActivityIndicator`.

#### Error

Si ocurre un problema durante la petición se muestra una pantalla de error con la posibilidad de volver a intentar la consulta.

```text
Unable to load products
↓
Try again
```

#### Success

Cuando la petición termina correctamente, los productos recibidos son mostrados mediante `FlatList`.

---

## Detalle de Producto

Cada producto puede abrirse desde el catálogo.

La navegación utiliza una ruta dinámica:

```text
/product/[id]
```

Ejemplo:

```text
/product/1
/product/5
/product/20
```

El identificador se obtiene mediante Expo Router:

```ts
useLocalSearchParams()
```

Posteriormente se convierte y valida antes de realizar la consulta correspondiente.

Flujo:

```text
/product/1
   ↓
id = "1"
   ↓
Number(id)
   ↓
useProduct(1)
   ↓
getProductById(1)
   ↓
Fake Store API
```

---

## Acceso Directo al Detalle

Una decisión importante es que la pantalla de detalle **no depende del objeto recibido desde el catálogo**.

El catálogo únicamente navega utilizando el identificador del producto.

La pantalla de detalle vuelve a consultar el producto utilizando:

```text
GET /products/:id
```

Esto significa que una ruta como:

```text
/product/7
```

puede resolver correctamente el producto aunque sea abierta directamente, sin haber visitado previamente el catálogo.

Esta decisión evita acoplar la pantalla de detalle al estado de navegación anterior.

---

## Carrito Global

El carrito utiliza **Zustand** como estado global de cliente.

La información principal almacenada es:

```ts
CartItem {
  product: Product;
  quantity: number;
}
```

Las operaciones principales son:

```text
increment(product)
decrement(productId)
remove(productId)
clearCart()
```

El mismo estado es utilizado desde:

```text
Catalog
↕
Product Detail
↕
Cart
↕
Checkout
```

Esto permite mantener las cantidades sincronizadas entre todas las pantallas.

Por ejemplo:

```text
Catalog quantity = 2
↓
Open Product Detail
↓
Detail quantity = 2
↓
Increase to 3
↓
Return to Catalog
↓
Catalog quantity = 3
```

---

## Control de Cantidades

Cada producto utiliza un control reutilizable:

```text
[-] 2 [+]
```

Las reglas principales son:

```text
- Una cantidad nunca puede ser negativa.
- Incrementar un producto nuevo lo agrega con quantity = 1.
- Incrementar un producto existente aumenta quantity.
- Reducir una cantidad de 1 a 0 elimina el producto.
- El botón "-" permanece deshabilitado cuando la cantidad es 0.
```

---

## Indicador Global del Carrito

El encabezado muestra un indicador con la cantidad total de unidades agregadas al carrito.

Por ejemplo:

```text
Producto A = 2
Producto B = 3

Total mostrado = 5
```

El número total no se almacena como estado independiente.

Se calcula a partir del contenido actual del carrito utilizando `reduce`.

---

## Shopping Cart

La pantalla de carrito muestra por producto:

```text
- Nombre.
- Precio unitario.
- Cantidad.
- Subtotal.
- Controles + / -.
- Acción Remove.
```

El subtotal se calcula como:

```text
subtotal = price * quantity
```

El total general se obtiene a partir de todos los productos:

```ts
items.reduce(
  (sum, item) =>
    sum + item.product.price * item.quantity,
  0
)
```

Cuando el carrito está vacío se muestra:

```text
Your cart is empty
```

junto con una acción para regresar al catálogo.

---

## Checkout

El proyecto incluye un flujo de checkout simulado.

No se procesa ningún pago real.

Flujo:

```text
Cart
↓
Proceed to Checkout
↓
Checkout
↓
Confirm Payment
↓
Success
```

La pantalla muestra:

```text
- Productos.
- Cantidades.
- Precio unitario.
- Subtotales.
- Cantidad total de items.
- Total de la compra.
- Aviso de pago simulado.
```

Si el carrito está vacío, el checkout queda bloqueado.

```text
items.length === 0
↓
Checkout unavailable
```

---

## Confirmación de Compra

Al confirmar el pago:

```text
Confirm Payment
↓
clearCart()
↓
markCheckoutCompleted()
↓
router.replace('/success')
```

El carrito es limpiado y la navegación utiliza `replace` para evitar mantener el checkout procesado como pantalla inmediatamente anterior.

---

## Protección de Success

La aplicación mantiene un estado:

```text
checkoutCompleted
```

La pantalla de éxito solo puede mostrarse cuando realmente se completó el checkout.

Si alguien intenta acceder directamente a:

```text
/success
```

sin haber completado una compra, la aplicación redirige al usuario.

Esto evita mostrar:

```text
Payment completed
```

cuando ningún checkout ocurrió realmente.

---

# Tecnologías Utilizadas

| Tecnología         | Uso dentro del proyecto                      |
| :----------------- | :------------------------------------------- |
| **React Native**   | Desarrollo de la aplicación móvil            |
| **Expo SDK 54**    | Entorno y herramientas de desarrollo         |
| **TypeScript**     | Tipado estático                              |
| **Expo Router**    | Navegación y rutas dinámicas                 |
| **TanStack Query** | Consultas HTTP, caché y estados del servidor |
| **Zustand**        | Estado global del carrito                    |
| **Fake Store API** | Fuente remota de productos                   |
| **Fetch API**      | Peticiones HTTP                              |
| **Git**            | Control de versiones                         |
| **GitHub**         | Repositorio remoto                           |
| **Expo Go**        | Ejecución y pruebas en dispositivo físico    |

---

# Versiones Utilizadas

El proyecto fue desarrollado y probado utilizando:

```text
Node.js: v24.19.0
Expo SDK: 54
```

Node fue gestionado durante el desarrollo mediante NVM.

Estas son las versiones utilizadas durante la implementación, no rutas locales requeridas por el proyecto.

El repositorio no depende de una instalación específica de IntelliJ ni contiene rutas absolutas hacia la computadora donde fue desarrollado.

---

# Requisitos para Ejecutar el Proyecto

Para trabajar con el proyecto se necesita:

```text
- Git
- Node.js
- npm
- Expo
- Expo Go en caso de utilizar un dispositivo físico
```

No es obligatorio utilizar IntelliJ IDEA.

El proyecto puede abrirse utilizando cualquier editor o IDE compatible con proyectos Node.js / React Native, por ejemplo:

```text
- IntelliJ IDEA
- WebStorm
- Visual Studio Code
- Android Studio
```

---

# Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Angel-Lugo97/mini-desk-store.git
```

Entrar al proyecto:

```bash
cd mini-desk-store
```

Instalar exactamente las dependencias registradas en `package-lock.json`:

```bash
npm ci
```

También puede utilizarse:

```bash
npm install
```

aunque `npm ci` es recomendable para obtener una instalación más reproducible a partir del lockfile.

---

# Ejecutar el Proyecto

Durante el desarrollo, el proyecto se ejecutó principalmente mediante túnel porque el dispositivo físico podía tener problemas de conexión directa mediante LAN.

Ejecutar:

```bash
npm run start:tunnel
```

El script corresponde a:

```bash
expo start --tunnel
```

También puede ejecutarse directamente con:

```bash
npx expo start --tunnel
```

Una vez iniciado Metro:

```text
1. Abrir Expo Go en el dispositivo.
2. Utilizar el QR generado por Expo.
3. Esperar a que Metro compile la aplicación.
4. Probar el flujo desde la pantalla de bienvenida.
```

---

## Limpiar Caché y Regenerar Rutas

Si Expo Router todavía no reconoce una nueva ruta o Metro mantiene caché anterior:

```bash
npx expo start --clear --tunnel
```

Este comando también resulta útil después de crear nuevas rutas dinámicas o archivos dentro de `app/`.

---

# Validaciones Técnicas

TypeScript:

```bash
npx tsc --noEmit
```

Lint:

```bash
npm run lint
```

Validación de diferencias Git:

```bash
git diff --check
```

Diagnóstico de Expo:

```bash
npx expo-doctor
```

---

# Estructura del Proyecto

La estructura principal es:

```text
mini-desk-store/
│
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── catalog.tsx
│   ├── cart.tsx
│   ├── checkout.tsx
│   ├── success.tsx
│   │
│   └── product/
│       └── [id].tsx
│
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── QuantityControl.tsx
│   │   └── CartIndicator.tsx
│   │
│   ├── hooks/
│   │   ├── useProducts.ts
│   │   └── useProduct.ts
│   │
│   ├── services/
│   │   └── productsApi.ts
│   │
│   ├── store/
│   │   └── cartStore.ts
│   │
│   ├── types/
│   │   ├── product.ts
│   │   └── cart.ts
│   │
│   └── utils/
│       └── queryRetry.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

# ¿Por Qué Esta Organización?

La arquitectura se mantuvo intencionalmente sencilla.

El objetivo no fue crear la mayor cantidad posible de capas, sino separar únicamente responsabilidades que realmente existen dentro de la aplicación.

---

## `app/`

Contiene las pantallas y rutas manejadas por Expo Router.

```text
app/index.tsx
→ /

app/catalog.tsx
→ /catalog

app/product/[id].tsx
→ /product/:id

app/cart.tsx
→ /cart

app/checkout.tsx
→ /checkout

app/success.tsx
→ /success
```

El nombre y posición de los archivos determinan las rutas de la aplicación.

---

## `src/components/`

Contiene componentes visuales reutilizables.

Ejemplos:

```text
ProductCard
QuantityControl
CartIndicator
```

Esto evita repetir la misma interfaz o comportamiento en distintas pantallas.

---

## `src/hooks/`

Contiene los hooks encargados de conectar las pantallas con los datos remotos.

```text
useProducts
useProduct
```

Estos hooks encapsulan TanStack Query y evitan que las pantallas tengan que conocer todos los detalles de la consulta.

---

## `src/services/`

Contiene la comunicación HTTP.

```text
productsApi.ts
```

Aquí se encuentran las funciones que utilizan `fetch` para comunicarse con Fake Store API.

Ejemplo conceptual:

```text
ProductsScreen
↓
useProducts
↓
getProducts
↓
Fake Store API
```

---

## `src/store/`

Contiene el estado global del cliente.

```text
cartStore.ts
```

Zustand mantiene el carrito y las acciones necesarias para modificarlo.

---

## `src/types/`

Contiene los tipos de TypeScript compartidos.

```text
Product
ProductRating
CartItem
```

Mantener los tipos separados permite reutilizarlos sin duplicar definiciones.

---

## `src/utils/`

Contiene pequeñas funciones auxiliares reutilizables.

Por ejemplo:

```text
queryRetry.ts
```

controla cuándo TanStack Query debe volver a intentar una petición.

---

# Decisiones Técnicas

## 1. ¿Por qué React Native con Expo?

React Native permite desarrollar una aplicación móvil utilizando React y TypeScript.

Expo simplifica la configuración del proyecto, la ejecución en dispositivos físicos y la integración con herramientas como Expo Router.

Para el alcance de esta prueba técnica, Expo evita configuración nativa innecesaria y permite concentrar el esfuerzo en la funcionalidad solicitada.

---

## 2. ¿Por qué TypeScript?

TypeScript ayuda a detectar problemas durante el desarrollo y define contratos claros para estructuras como:

```text
Product
ProductRating
CartItem
```

Esto reduce errores relacionados con propiedades inexistentes o tipos incorrectos.

Una limitación importante es que TypeScript solo valida tipos durante desarrollo y compilación.

No valida automáticamente el JSON recibido desde Fake Store API en runtime.

Para esta prueba se decidió confiar en el contrato de la API.

En una aplicación de producción podría añadirse validación mediante herramientas como:

```text
Zod
Valibot
```

o validación manual.

---

## 3. ¿Por qué Expo Router?

Se eligió Expo Router por su integración natural con Expo y su modelo de navegación basado en archivos.

Las rutas se pueden entender directamente desde la estructura del proyecto:

```text
app/catalog.tsx
→ /catalog

app/product/[id].tsx
→ /product/:id
```

Esto simplifica especialmente la implementación de rutas dinámicas.

---

## 4. ¿Por qué el detalle consulta el producto nuevamente por ID?

La pantalla de detalle no recibe el objeto completo desde el catálogo.

Únicamente utiliza el identificador presente en la URL.

```text
/product/10
↓
id = 10
↓
GET /products/10
```

Esto permite abrir una ruta directamente y obtener el producto correcto sin depender de haber visitado anteriormente el listado.

Además, reduce el acoplamiento entre el catálogo y el detalle.

---

## 5. ¿Por qué TanStack Query?

Los productos representan **server state**.

Son datos provenientes de un servidor remoto y tienen necesidades diferentes al estado local de la interfaz.

TanStack Query permite manejar:

```text
- Loading.
- Error.
- Success.
- Cache.
- staleTime.
- Retry.
- Refetch.
```

sin crear manualmente múltiples estados con `useState`.

---

## 6. ¿Cómo funciona el caché?

El catálogo utiliza una clave de consulta similar a:

```ts
['products']
```

y los detalles utilizan:

```ts
['product', productId]
```

Los datos permanecen frescos durante:

```text
5 minutos
```

mediante `staleTime`.

Durante ese periodo, TanStack Query puede reutilizar información disponible en caché según las condiciones de la consulta.

---

## 7. ¿Cómo se manejan los retries?

El proyecto no utiliza un número fijo de reintentos para cualquier tipo de error.

Se implementó una estrategia mediante:

```text
shouldRetryQuery
```

La regla general es:

```text
Errores HTTP 4xx
→ no retry

Errores de red o HTTP 5xx
→ hasta 2 retries
```

Un error como `404` normalmente indica que repetir inmediatamente la misma petición no resolverá el problema.

En cambio, un error de red o servidor puede ser temporal.

---

## 8. ¿Por qué Zustand?

El carrito representa **client state**.

Debe ser compartido entre varias pantallas:

```text
Catalog
Product Detail
Cart
Checkout
```

Zustand permite crear un store global pequeño sin introducir una cantidad elevada de configuración adicional.

Para el tamaño actual de la aplicación resulta suficiente.

---

## 9. ¿Por qué no Redux?

Redux es una herramienta válida, especialmente para aplicaciones grandes y flujos de estado complejos.

Sin embargo, el estado global de Mini Desk Store es reducido.

Principalmente se necesita almacenar:

```text
items
checkoutCompleted
```

y unas pocas acciones.

Utilizar Redux habría añadido más configuración y conceptos sin aportar una ventaja proporcional para este alcance.

Por ese motivo se eligió Zustand.

---

## 10. ¿Por qué separar server state y client state?

El proyecto diferencia dos tipos de información.

### Server State

```text
Productos provenientes de Fake Store API
→ TanStack Query
```

### Client State

```text
Carrito y estado del checkout
→ Zustand
```

Los productos pertenecen al servidor y necesitan caché, refetch y manejo de errores HTTP.

El carrito pertenece a la sesión actual del usuario y necesita estar sincronizado entre pantallas.

Mantener ambas responsabilidades separadas evita utilizar una sola herramienta para problemas diferentes.

---

## 11. ¿Por qué usar `fetch` en lugar de Axios?

La aplicación consume una API pequeña y únicamente necesita realizar peticiones HTTP sencillas.

`fetch` ya está disponible en el entorno y es suficiente para este caso.

La comunicación HTTP permanece encapsulada dentro de:

```text
src/services/productsApi.ts
```

Por ello sería posible cambiar la implementación en el futuro sin afectar directamente a las pantallas.

---

## 12. ¿Por qué crear una capa HTTP separada?

Las pantallas no realizan directamente:

```ts
fetch(...)
```

La responsabilidad se encuentra en:

```text
productsApi.ts
```

Esto mantiene un flujo claro:

```text
UI
↓
Hook
↓
Service
↓
API
```

La interfaz se concentra en representar información mientras que el servicio se concentra en obtenerla.

---

## 13. ¿Cómo se manejan los errores HTTP?

La capa de servicios utiliza un error específico:

```text
ApiError
```

que permite conservar información como:

```text
message
status
```

De esta forma la aplicación puede diferenciar, por ejemplo:

```text
404
→ Product not found

500 / red
→ Unable to load product
```

Esto también permite tomar mejores decisiones sobre reintentos.

---

## 14. ¿Por qué los totales no se almacenan en Zustand?

Valores como:

```text
subtotal
total
totalItems
```

pueden calcularse directamente desde los productos y sus cantidades.

Por ello se consideran **estado derivado**.

Por ejemplo:

```text
subtotal = price * quantity
```

y:

```text
total = reduce(items)
```

Guardar esos valores adicionalmente en Zustand crearía información duplicada que podría quedar desincronizada.

---

## 15. ¿Por qué utilizar `replace` después del checkout?

Después de confirmar el pago se utiliza:

```text
router.replace('/success')
```

en lugar de simplemente agregar otra pantalla al historial.

El objetivo es evitar que el checkout ya procesado quede como la pantalla inmediatamente anterior.

Esto mejora el comportamiento del flujo posterior a una compra.

---

## 16. ¿Por qué existe `checkoutCompleted`?

Limitar únicamente el botón visual de regreso no evita que alguien intente acceder directamente a:

```text
/success
```

Por ello el store mantiene:

```text
checkoutCompleted
```

La pantalla de éxito verifica este valor antes de mostrar una compra completada.

Esto mantiene coherencia entre el estado de la aplicación y la información mostrada al usuario.

---

## 17. ¿Por qué no se utilizó una arquitectura más compleja?

No se añadieron capas como:

```text
domain/
repositories/
use-cases/
adapters/
infrastructure/
```

porque el tamaño actual del proyecto no las necesita.

Agregar abstracciones únicamente para demostrar patrones habría aumentado la cantidad de código y dificultado la lectura sin resolver un problema real.

La estructura actual busca seguir esta idea:

```text
problema real
→ solución sencilla
→ responsabilidad clara
→ código entendible
```

---

# Manejo de Estado

La división principal es:

```text
SERVER STATE
│
└── TanStack Query
    ├── Products
    └── Product Detail


CLIENT STATE
│
└── Zustand
    ├── Cart Items
    ├── Quantities
    └── Checkout Completed
```

Esto permite que cada herramienta tenga una responsabilidad concreta.

---

# Manejo de Errores

El proyecto contempla diferentes situaciones:

```text
API loading
→ ActivityIndicator

API error
→ mensaje + retry

404 de producto
→ Product not found

Otros errores
→ Unable to load product

Carrito vacío
→ Empty Cart

Checkout sin productos
→ Checkout unavailable

Acceso inválido a Success
→ Redirect
```

---

# Navegación

Las principales rutas son:

| Ruta            | Pantalla        |
| :-------------- | :-------------- |
| `/`             | Welcome         |
| `/catalog`      | Product Catalog |
| `/product/[id]` | Product Detail  |
| `/cart`         | Shopping Cart   |
| `/checkout`     | Checkout        |
| `/success`      | Order Complete  |

Expo Router se encarga de relacionar cada archivo dentro de `app/` con su ruta correspondiente.

---

# Git y Control de Versiones

El proyecto utiliza Git y GitHub para mantener un historial incremental de cambios.

La implementación se dividió en commits pequeños relacionados con funcionalidades concretas, por ejemplo:

```text
chore: initialize Expo TypeScript application
chore: configure base application navigation
feat: implement product catalog with API caching
feat: implement global cart state and quantity controls
feat: add dynamic product detail screen
feat: implement cart summary and totals
feat: implement mock checkout flow
fix: handle API and navigation edge cases
refactor: move product catalog to dedicated route
feat: add welcome screen and catalog navigation
```

Este enfoque permite entender la evolución del proyecto y revisar cambios funcionales de forma independiente.

---

# Portabilidad del Proyecto

El repositorio no depende de archivos particulares de IntelliJ IDEA.

Configuraciones locales como:

```text
.idea/
```

se encuentran ignoradas mediante `.gitignore`.

También se ignoran:

```text
node_modules/
.expo/
dist/
ios/
android/
```

cuando corresponden a archivos generados o específicos del entorno local.

Por ello otro desarrollador debería poder trabajar con el proyecto mediante:

```bash
git clone https://github.com/Angel-Lugo97/mini-desk-store.git
cd mini-desk-store
npm ci
npm run start:tunnel
```

sin depender del IDE utilizado durante el desarrollo original.

---

# Qué se Dejó Fuera

Algunas funcionalidades fueron dejadas fuera intencionalmente porque no eran necesarias para resolver el alcance principal de la prueba.

```text
- Autenticación.
- Registro de usuarios.
- Backend propio.
- Base de datos propia.
- Pago real.
- Favoritos.
- Búsqueda.
- Filtros.
- Dark mode.
- Animaciones avanzadas.
- Persistencia del carrito con AsyncStorage.
- Validación runtime con Zod o similar.
- CI/CD.
- Suite completa de tests automatizados.
```

Estas características no fueron omitidas por una limitación de la arquitectura actual, sino para mantener el esfuerzo enfocado en los requisitos principales.

---

# ¿Qué Haría con Más Tiempo?

## Tests automatizados

Añadiría pruebas para las partes con mayor lógica de negocio.

Especialmente:

```text
- increment
- decrement
- remove
- clearCart
- quantity 1 → 0
- total de unidades
- subtotales
- total general
- checkoutCompleted
- estrategia de retry
```

---

## Validación runtime

Actualmente TypeScript describe el contrato esperado de Fake Store API, pero no valida el JSON durante la ejecución.

Con más tiempo agregaría una solución como:

```text
Zod
```

para validar las respuestas antes de utilizarlas dentro de la aplicación.

---

## Persistencia del carrito

El carrito actual pertenece a la sesión activa.

Podría añadirse:

```text
AsyncStorage
```

para conservar los productos aunque la aplicación sea cerrada completamente.

---

## Mejoras visuales

Se podrían incorporar:

```text
- Skeleton loaders.
- Animaciones.
- Mejor feedback visual al agregar productos.
- Mejor diseño responsive.
- Estados vacíos más elaborados.
- Mejoras de accesibilidad.
```

---

## Búsqueda y filtros

Para un catálogo más grande agregaría:

```text
- Búsqueda por nombre.
- Filtro por categoría.
- Ordenamiento por precio.
- Ordenamiento por rating.
```

---

## Observabilidad

En una aplicación de producción también sería recomendable incorporar herramientas para registrar errores y comportamiento inesperado.

---

## CI/CD

Podría añadirse una pipeline para ejecutar automáticamente:

```bash
npx tsc --noEmit
npm run lint
```

en cada Pull Request o push relevante.

---

# Limitaciones Actuales

Fake Store API es un servicio externo utilizado únicamente para fines demostrativos.

La aplicación depende de su disponibilidad para obtener productos.

El checkout también es completamente simulado y no representa una integración financiera real.

El carrito no se persiste después de cerrar completamente la aplicación.

---

# Flujo Principal para Validación

Un flujo recomendado para comprobar el funcionamiento de la prueba es:

```text
1. Abrir la aplicación.
2. Visualizar Welcome.
3. Entrar al Catalog.
4. Esperar la carga de productos.
5. Abrir un Product Detail.
6. Aumentar su cantidad.
7. Verificar el Cart Indicator.
8. Abrir Cart.
9. Verificar subtotal y total.
10. Proceed to Checkout.
11. Confirm Payment.
12. Visualizar Success.
13. Continue Shopping.
14. Verificar que el carrito está vacío.
```

También puede comprobarse directamente una ruta dinámica:

```text
/product/:id
```

para validar que el detalle no depende de haber visitado anteriormente el listado.

---

# Principios Seguidos Durante el Desarrollo

El proyecto mantiene una filosofía sencilla:

```text
Problema real
↓
Solución sencilla
↓
Código entendible
↓
Responsabilidad clara
↓
Requisito cumplido
```

El objetivo principal fue construir una solución funcional y fácil de mantener sin introducir complejidad que el tamaño de la aplicación todavía no requiere.

---

# Conclusión

Mini Desk Store implementa un flujo completo de tienda móvil utilizando React Native, Expo y TypeScript.

La aplicación separa los datos remotos y el estado del cliente utilizando TanStack Query y Zustand respectivamente, utiliza Expo Router para navegación y rutas dinámicas, y mantiene una capa HTTP independiente basada en `fetch`.

Las decisiones técnicas se orientaron a mantener una solución pequeña, legible y proporcional al problema, evitando duplicación de estado y abstracciones innecesarias.

El resultado es una aplicación que cubre el flujo principal:

```text
Welcome
→ Catalog
→ Product Detail
→ Cart
→ Checkout
→ Success
```

manteniendo además manejo de estados remotos, caché, reintentos, rutas dinámicas, sincronización global del carrito y protección del flujo de checkout.
