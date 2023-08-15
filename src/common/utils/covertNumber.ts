export const formatNumberToCurrency = ( num?: number) => {
    return num?.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code',
    });
  }