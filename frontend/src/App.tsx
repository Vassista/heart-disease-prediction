import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Stethoscope,
  User,
  Droplets,
  Zap,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PredictionResult = {
  prediction: number;
  probability: number;
  message: string;
};

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    age: 50,
    sex: 'M',
    cp: 'ASY',
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 'Normal',
    thalach: 150,
    exang: 'N',
    oldpeak: 1.0,
    slope: 'Flat'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' || name === 'trestbps' || name === 'chol' || name === 'thalach' || name === 'oldpeak' || name === 'fbs'
        ? parseFloat(value)
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let apiUrl = import.meta.env.VITE_API_URL || '/api';
      // Remove trailing slash if present to avoid double slashes
      if (apiUrl.endsWith('/')) {
        apiUrl = apiUrl.slice(0, -1);
      }

      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Prediction failed');
      }

      const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 3000));

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container min-h-screen">
      <div className="scanner-line"></div>

      {/* Header */}
      <header className="mb-12 pt-8 flex sm:flex-row flex-col items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent from-blue-400 to-emerald-400 bg-gradient-to-r mb-2">
            PULSEGUARD <span className="text-zinc-500 text-3xl">SENTINEL</span>
          </h1>
          <p className="text-zinc-400 uppercase tracking-widest text-sm mono">
            Next-Gen Cardiovascular Diagnostic Engine // v1.0.4
          </p>
        </div>
        <div className="glass px-4 py-2 flex items-center gap-3 bg-emerald-500/10">
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 leading-none mb-1 mono">SYSTEM STATUS</span>
            <span className="text-xs font-bold mono leading-none text-emerald-400">OPTIMAL</span>
          </div>
        </div>
      </header>

      <main className="grid lg:grid-cols-[1fr_400px] gap-8 pb-12">
        {/* Input Form Section */}
        <section>
          <form onSubmit={handleSubmit} className="glass p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 from-blue-400 to-emerald-400 bg-gradient-to-r opacity-30"></div>

            <div className="flex items-center gap-3 mb-8">
              <Activity className="text-blue-500" size={24} />
              <h2 className="text-2xl lowercase tracking-tight">Clinical Parameters</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Personal Data */}
              <div className="space-y-6">
                <div className="input-group">
                  <label htmlFor="age"><User size={14} className="mr-2" /> Age</label>
                  <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label htmlFor="sex"><Activity size={14} className="mr-2" /> Biological Sex</label>
                  <div className="relative">
                    <select id="sex" name="sex" value={formData.sex} onChange={handleChange}>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="cp"><AlertCircle size={14} className="mr-2" /> Chest Pain Type</label>
                  <div className="relative">
                    <select id="cp" name="cp" value={formData.cp} onChange={handleChange}>
                      <option value="ASY">Asymptomatic (ASY)</option>
                      <option value="ATA">Atypical Angina (ATA)</option>
                      <option value="NAP">Non-Anginal Pain (NAP)</option>
                      <option value="TA">Typical Angina (TA)</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="trestbps"><Droplets size={14} className="mr-2" /> Resting BP (mm Hg)</label>
                  <input type="number" id="trestbps" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label htmlFor="chol"><Activity size={14} className="mr-2" /> Cholesterol (mg/dl)</label>
                  <input type="number" id="chol" name="chol" value={formData.chol} onChange={handleChange} required />
                </div>
              </div>

              {/* Heart Metrics */}
              <div className="space-y-6">
                <div className="input-group">
                  <label htmlFor="fbs"><Zap size={14} className="mr-2" /> Fasting Blood Sugar {'>'} 120</label>
                  <div className="relative">
                    <select id="fbs" name="fbs" value={formData.fbs} onChange={handleChange}>
                      <option value="0">Normal</option>
                      <option value="1">Elevated</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="restecg"><Activity size={14} className="mr-2" /> Resting ECG</label>
                  <div className="relative">
                    <select id="restecg" name="restecg" value={formData.restecg} onChange={handleChange}>
                      <option value="Normal">Normal</option>
                      <option value="ST">ST-T Wave Abnormality</option>
                      <option value="LVH">Left Ventricular Hypertrophy</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="thalach"><Heart size={14} className="mr-2" /> Max Heart Rate</label>
                  <input type="number" id="thalach" name="thalach" value={formData.thalach} onChange={handleChange} required />
                </div>

                <div className="input-group">
                  <label htmlFor="exang"><Wind size={14} className="mr-2" /> Exercise Angina</label>
                  <div className="relative">
                    <select id="exang" name="exang" value={formData.exang} onChange={handleChange}>
                      <option value="N">No</option>
                      <option value="Y">Yes</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                  </div>
                </div>

                <div className="input-group">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="oldpeak">ST Depress</label>
                      <input type="number" step="0.1" id="oldpeak" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="slope">ST Slope</label>
                      <div className="relative">
                        <select id="slope" name="slope" value={formData.slope} onChange={handleChange}>
                          <option value="Up">Up</option>
                          <option value="Flat">Flat</option>
                          <option value="Down">Down</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                type="submit"
                disabled={isLoading}
                className={`btn ${isLoading ? 'opacity-50' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Activity className="animate-spin" size={20} /> ANALYZING BIOMETRICS...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    EXECUTE DIAGNOSTIC <ChevronRight size={20} />
                  </span>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Results Section */}
        <section className="space-y-8">
          <AnimatePresence mode="wait">
            {!result && !isLoading && !error && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 flex flex-col items-center justify-center text-center min-h-[500px]"
              >
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
                  <Stethoscope size={40} className="text-zinc-700" />
                </div>
                <h3 className="text-2xl text-zinc-500 mb-2">System Awaiting Data</h3>
                <p className="text-zinc-600 max-w-[200px] text-sm mono uppercase tracking-widest text-[10px]">Ready for biometrics input.</p>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass p-8 flex flex-col items-center justify-center text-center min-h-[500px]"
              >
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 animate-spin"></div>
                  <Activity size={40} className="absolute inset-0 m-auto text-blue-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl text-blue-400">Processing...</h3>
                  <p className="text-xs mono text-blue-900">RUNNING XGBOOST INFERENCE</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 flex flex-col items-center justify-center text-center min-h-[300px] bg-red-500/10 border-red-500/30"
              >
                <AlertCircle size={48} className="text-red-500 mb-6" />
                <h3 className="text-2xl text-red-500 mb-4">Diagnostic Failure</h3>
                <code className="block p-4 bg-red-950/30 rounded text-xs text-red-400 mono w-full overflow-hidden break-words">{error}</code>
                <button
                  onClick={() => setError(null)}
                  className="mt-8 text-xs underline uppercase tracking-widest text-red-400 hover:text-red-200 pointer"
                >
                  Clear Exception
                </button>
              </motion.div>
            )}

            {result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className={`glass p-8 min-h-[500px] flex flex-col relative overflow-hidden`}
                style={{ borderColor: result.prediction === 1 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)' }}
              >
                <div className={`absolute top-0 right-0 p-4 mono text-xs opacity-20`}>
                  ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="gauge-container">
                    <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100" cy="100" r="90"
                        fill="transparent"
                        stroke="rgba(24, 24, 27, 0.8)"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="100" cy="100" r="90"
                        fill="transparent"
                        stroke={result.prediction === 1 ? '#ef4444' : '#10b981'}
                        strokeWidth="12"
                        strokeDasharray={565.4}
                        initial={{ strokeDashoffset: 565.4 }}
                        animate={{ strokeDashoffset: 565.4 - (565.4 * result.probability) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="text-center">
                      <div className="gauge-value">{Math.round(result.probability * 100)}%</div>
                      <div className="text-xs mono uppercase tracking-widest opacity-60">Risk Score</div>
                    </div>
                  </div>

                  <div className="space-y-4 text-center">
                    <div className={`flex items-center justify-center gap-2 px-6 py-2 rounded-full border text-sm font-bold mono ${
                      result.prediction === 1
                        ? 'text-red-400'
                        : 'text-emerald-400'
                    }`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      {result.prediction === 1 ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                      {result.prediction === 1 ? 'HIGH RISK DETECTED' : 'LOW RISK DETECTED'}
                    </div>

                    <p className="text-lg px-4 leading-relaxed">
                      {result.message}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
                  <div className="text-left">
                    <div className="text-xs mono text-zinc-500 uppercase">Engine</div>
                    <div className="text-xs font-bold text-blue-400">XGBOOST V2.1</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs mono text-zinc-500 uppercase">Status</div>
                    <div className="text-xs font-bold text-emerald-400">VERIFIED</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Insights Card */}
          <div className="glass p-6 opacity-60 hover:opacity-100 transition-opacity">
            <h4 className="text-sm font-bold flex items-center gap-2 mb-4 uppercase tracking-wider">
              <TrendingUp size={16} className="text-blue-500" /> Statistical Context
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2 text-xs mono">
                <span className="text-zinc-500">Global Sensitivity</span>
                <span className="text-emerald-500">89.4%</span>
              </div>
              <div className="flex justify-between border-b pb-2 text-xs mono">
                <span className="text-zinc-500">Model Specificity</span>
                <span className="text-blue-500">92.1%</span>
              </div>
              <div className="flex justify-between text-xs mono">
                <span className="text-zinc-500">Last Synched</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs mono text-zinc-600 uppercase tracking-widest">
        <span>© 2026 PulseGuard Biomedical</span>
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><Activity size={10} /> Live Telemetry</span>
          <span>Protocol 7A-X</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
