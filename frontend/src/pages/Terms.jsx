import React from 'react';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Shield, AlertTriangle, FileText, RefreshCw } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200 group">
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Torna alla Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Norme di Utilizzo
          </h1>
          <p className="text-gray-400 text-lg">eliteHUB - Ultima revisione: Aprile 2026</p>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">
          {/* Section 1 */}
          <Card className="bg-[#161616] border-gray-800/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">I. Consenso Contrattuale</h2>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed ml-14">
              L'accesso e l'impiego delle risorse presenti su <span className="text-blue-400 font-semibold">eliteHUB</span> attestano
              la piena accettazione delle presenti clausole operative. Utilizzando i nostri servizi, l'utente conferma
              di aver letto, compreso e accettato tutti i termini qui esposti.
            </p>
          </Card>

          {/* Section 2 */}
          <Card className="bg-[#161616] border-gray-800/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">II. Gestione Asset Digitali</h2>
              </div>
            </div>
            <div className="space-y-4 ml-14">
              <p className="text-gray-300 leading-relaxed">
                <span className="text-blue-400 font-semibold">eliteHUB</span> opera esclusivamente nella compravendita
                di prodotti virtuali. Data la natura immateriale dei beni:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    Ogni transazione è considerata <span className="text-white font-semibold">definitiva e non revocabile</span> una
                    volta che le credenziali o le chiavi sono state trasmesse all'acquirente.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    Eventuali rimborsi saranno valutati solo se viene dimostrata l'inefficacia dell'asset al momento
                    esatto della consegna.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">
                    La piattaforma declina ogni responsabilità per limitazioni, sospensioni o ban dei profili derivanti
                    da un utilizzo improprio post-vendita.
                  </span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Section 3 */}
          <Card className="bg-[#161616] border-gray-800/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">III. Sicurezza dei Profili</h2>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed ml-14">
              L'utente è l'<span className="text-white font-semibold">unico custode della riservatezza</span> dei propri
              dati di accesso. Ogni operazione effettuata tramite un account registrato ricade sotto la diretta
              responsabilità del titolare dello stesso. Si raccomanda di utilizzare password sicure e di non condividere
              mai le credenziali con terze parti.
            </p>
          </Card>

          {/* Section 4 */}
          <Card className="bg-[#161616] border-gray-800/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">IV. Condotta Vietata</h2>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed ml-14">
              È <span className="text-red-400 font-semibold">rigorosamente proibito</span> utilizzare l'infrastruttura
              di <span className="text-blue-400 font-semibold">eliteHUB</span> per scopi illeciti o non autorizzati.
              Gli utenti sono tenuti al rispetto delle normative vigenti nel proprio territorio di residenza. Qualsiasi
              violazione di queste norme può comportare la sospensione immediata dell'account e azioni legali.
            </p>
          </Card>

          {/* Section 5 */}
          <Card className="bg-[#161616] border-gray-800/50 p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <RefreshCw className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">V. Revisioni delle Norme</h2>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed ml-14">
              Ci riserviamo l'autorità di <span className="text-white font-semibold">aggiornare queste disposizioni</span> in
              qualsiasi momento. È compito dell'utente monitorare periodicamente questa sezione per eventuali modifiche.
              L'uso continuato dei servizi dopo la pubblicazione di modifiche costituisce accettazione delle nuove norme.
            </p>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border-blue-500/30 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Hai Domande?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Per qualsiasi domanda o chiarimento riguardo ai nostri Termini di Servizio, non esitare a contattarci.
              Il nostro team di supporto è disponibile 24/7 per assisterti.
            </p>
            <div className="flex items-center gap-2 text-blue-400">
              <span className="font-semibold">Email:</span>
              <a href="mailto:elitehub.assistence@gmail.com" className="hover:text-blue-300 transition-colors duration-200">
                elitehub.assistence@gmail.com
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Terms;
