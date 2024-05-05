import { useEffect, useState } from 'react';
// Import your CSS file for styling (optional)

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=languages');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="country-list">
      {isLoading && <p>Loading countries...</p>}
      {error && <p className="error">{error}</p>}
      {countries.length > 0 && (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name} - Languages: {country.languages.join(', ')}
            </li>
          ))}
        </ul>
      )}
      {countries.length === 0 && !isLoading && <p>No countries found.</p>}
    </div>
  );
}

export default CountryList;