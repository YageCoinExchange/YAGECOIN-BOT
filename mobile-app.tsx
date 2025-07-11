"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Play, Pause, TrendingUp, Activity, DollarSign, Wallet, Bell, RefreshCw, AlertTriangle } from "lucide-react"

interface MobileAppProps {
  botActive: boolean
  setBotActive: (active: boolean) => void
  opportunities: any[]
  dailyStats: any
  usdtBalance: number
  botConfig: any
}

export function MobileApp({
  botActive,
  setBotActive,
  opportunities,
  dailyStats,
  usdtBalance,
  botConfig,
}: MobileAppProps) {
  const [notifications, setNotifications] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 max-w-md mx-auto">
      {/* Header Mobile */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">🤖 YAGECOIN BOT</h1>
          <p className="text-sm text-gray-400">Arbitraje IA Ultimate</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-white border-gray-600">
            <Bell className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="text-white border-gray-600">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Estado del Bot */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>🔥 Estado del Bot</span>
            <Badge variant={botActive ? "default" : "destructive"}>{botActive ? "ACTIVO" : "PARADO"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span>Trading Automático</span>
            <Switch checked={botConfig.autoTrade} />
          </div>
          <Button
            onClick={() => setBotActive(!botActive)}
            className={`w-full ${botActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            {botActive ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Detener Bot
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Iniciar Bot
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Oportunidades</p>
                <p className="text-lg font-bold text-green-500">{opportunities.length}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Profit Hoy</p>
                <p className="text-lg font-bold text-blue-500">+${dailyStats.totalProfitToday.toFixed(2)}</p>
              </div>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Balance USDT</p>
                <p className="text-lg font-bold text-yellow-500">${usdtBalance.toFixed(0)}</p>
              </div>
              <Wallet className="w-6 h-6 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Operaciones</p>
                <p className="text-lg font-bold text-purple-500">{dailyStats.operationsToday}</p>
              </div>
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Oportunidades Principales */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">🎯 Mejores Oportunidades</CardTitle>
        </CardHeader>
        <CardContent>
          {opportunities.slice(0, 3).map((opp, index) => (
            <div
              key={opp.id}
              className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0"
            >
              <div>
                <p className="text-sm font-medium">{opp.route.join("→")}</p>
                <p className="text-xs text-gray-400">Confianza: {opp.confidence}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-green-500">+{opp.grossProfit.toFixed(2)}%</p>
                <p className="text-xs text-gray-400">${((opp.netProfit / 100) * opp.amount).toFixed(2)}</p>
              </div>
            </div>
          ))}
          {opportunities.length === 0 && <p className="text-center text-gray-400 py-4">🔍 Buscando oportunidades...</p>}
        </CardContent>
      </Card>

      {/* Configuración Rápida */}
      <Card className="bg-gray-800 border-gray-700 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">⚙️ Configuración Rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Notificaciones</span>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Usar BNB para Fees</span>
            <Switch checked={botConfig.useBNBForFees} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Stop Loss</span>
            <Switch checked={botConfig.stopLossEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Alertas */}
      {usdtBalance < 1000 && (
        <Card className="bg-red-900 border-red-700 mb-4">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-sm font-medium text-red-300">Balance Bajo</p>
                <p className="text-xs text-red-400">Considera recargar USDT</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6">
        <p>Última actualización: {lastUpdate.toLocaleTimeString()}</p>
        <p>🔗 Conectado a Binance | 🎯 30 Rutas Activas</p>
      </div>
    </div>
  )
}


#El archivo mobile-app.tsx define un componente React llamado MobileApp, orientado a servir como la interfaz principal de una aplicación móvil para monitorear y controlar un bot de arbitraje en Binance. El diseño y los controles están optimizados para dispositivos móviles, utilizando componentes UI personalizados y varios íconos de lucide-react para una experiencia moderna y visualmente atractiva.

**Resumen detallado de su funcionamiento:**

1. **Props recibidas:**
   - `botActive`: Estado booleano que indica si el bot está activo.
   - `setBotActive`: Función para activar/desactivar el bot.
   - `opportunities`: Array con las oportunidades de arbitraje encontradas.
   - `dailyStats`: Objeto con estadísticas del día (profit, operaciones, etc.).
   - `usdtBalance`: Saldo actual en USDT.
   - `botConfig`: Configuración relevante del bot (autoTrade, useBNBForFees, stopLossEnabled).

2. **Estados internos:**
   - `notifications`: Si las notificaciones están activas.
   - `lastUpdate`: Fecha/hora de la última actualización, que se refresca cada 5 segundos con useEffect.

3. **Estructura visual:**
   - **Header:** Muestra el nombre e ícono del bot, subtítulo y botones de notificaciones y refresco.
   - **Estado del Bot:** Card con el estado actual del bot (activo/parado), switch para autoTrade y botón para iniciar/detener el bot.
   - **Estadísticas rápidas:** Cuatro cards que muestran oportunidades encontradas, profit del día, balance en USDT y operaciones del día, cada una con su ícono y color distintivo.
   - **Mejores Oportunidades:** Card que lista hasta 3 oportunidades principales, mostrando ruta, confianza, profit y ganancia estimada. Si no hay oportunidades, muestra un mensaje de “buscando oportunidades”.
   - **Configuración Rápida:** Card con switches para activar/desactivar notificaciones, uso de BNB para fees y stop loss.
   - **Alertas:** Si el balance en USDT es menor a 1000, muestra una alerta visual advirtiendo al usuario.
   - **Footer:** Muestra la hora de la última actualización y el estado de la conexión/rutas activas.

4. **Estilizado y UX:**
   - Usa clases de Tailwind CSS para un diseño oscuro, responsivo y moderno.
   - Emplea cards, badges, switches y botones para una experiencia táctil y visual intuitiva.
   - Los íconos aportan claridad rápida sobre cada sección y estado.

**¿Qué NO hace este archivo?**
- No implementa lógica de negocio del bot, sólo la presentación y control de su estado.
- No realiza llamadas a APIs ni gestiona datos externos.
- No se encarga de la navegación ni de la gestión de rutas de la app.

**En resumen:**  
Este archivo implementa la pantalla principal para la gestión de un bot de arbitraje en Binance desde el móvil, mostrando el estado del bot, métricas clave, oportunidades, configuración rápida y alertas, todo con una interfaz moderna y enfocada en la usabilidad móvil.
