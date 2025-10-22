/**
 * @page HomePage
 * @summary Home page with investment simulator
 * @domain investment
 * @type page-component
 * @category investment-simulation
 *
 * @routing
 * - Path: /
 * - Params: none
 * - Query: none
 * - Guards: none
 */
export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Simulador de Investimento</h1>
            <p className="text-lg text-gray-600">
              Calcule suas projeções de investimento com juros compostos
            </p>
          </header>

          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-700 text-center">
              Sistema pronto para receber implementação das features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
