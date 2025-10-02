

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center  text-center bg-gradient-to-br from-sky-50 via-green-100 to-green-200">
      <h1 className="text-6xl font-bold text-cyan-600 hover:text-cyan-800">404</h1>
      <p className="mt-4 text-xl text-gray-700">Oops! Page not found.</p>
      <div
       
        className="mt-6 inline-block px-6 py-3 bg-cyan-600 text-white/60 hover:text-white/90 rounded-lg hover:bg-cyan-700 transition"
      >
        Go back home
      </div>
    </div>
  )
}
