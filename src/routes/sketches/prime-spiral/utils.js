function isMultiple(n, m) {
  return n % m === 0;
}

function isPrime(primes, number) {
  if (number === 2 || number === 5) return true;

  const sn = number.toString();

  if (sn.charAt(sn.length - 1) === '5') return false;

  for (let i = 0; i < primes.length; i++) if (isMultiple(number, primes[i])) return false;

  return true;
}

export const findPrimes = (iterations, start = 2) => {
  const primes = [];
  for (let i = start; i < iterations; i++) if (isPrime(primes, i)) primes.push(i);
  return primes;
};

export default findPrimes;
