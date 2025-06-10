import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Github, Chrome } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí iría la lógica de autenticación
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      name: "",
      rememberMe: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-white to-slate-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-slate-400/10 to-stone-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-stone-400/10 to-slate-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/5 to-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 p-8">
          {/* Header */}
          <div className="text-center pb-8">
            <div className="mx-auto w-12 h-12 bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl flex items-center justify-center mb-4 shadow-sm">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              {isLogin ? "Bienvenido de vuelta" : "Crear cuenta"}
            </h1>
            <p className="text-slate-600 mt-2">
              {isLogin
                ? "Ingresa tus credenciales para acceder a tu cuenta"
                : "Completa los datos para crear tu nueva cuenta"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Nombre completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-colors bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-slate-600 bg-gray-100 border-stone-300 rounded focus:ring-slate-500 focus:ring-2 accent-slate-600"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-sm text-slate-600"
                  >
                    Recordarme
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-slate-700 hover:text-slate-900 font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 shadow-sm"
            >
              {isLogin ? "Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>

          {/* Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
                O continúa con
              </span>
            </div>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center py-3 px-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-slate-700">
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </button>
            <button className="flex items-center justify-center py-3 px-4 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-slate-700">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 space-y-4">
            <div className="text-center text-sm text-slate-600">
              {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
              <button
                onClick={toggleMode}
                className="text-slate-700 hover:text-slate-900 font-medium underline-offset-4 hover:underline focus:outline-none transition-colors"
              >
                {isLogin ? "Regístrate aquí" : "Inicia sesión"}
              </button>
            </div>

            <div className="text-xs text-center text-slate-500">
              Al continuar, aceptas nuestros{" "}
              <a
                href="#"
                className="text-slate-700 hover:text-slate-900 hover:underline transition-colors"
              >
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a
                href="#"
                className="text-slate-700 hover:text-slate-900 hover:underline transition-colors"
              >
                Política de Privacidad
              </a>
            </div>
          </div>
        </div>

        {/* Additional features showcase */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-8 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
              <span>Rápido</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
              <span>Confiable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
