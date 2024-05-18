const FormatPrice = (value: string) => {
  const formatted = parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  const noSpace = formatted.replace(/\s/g, '');
  return noSpace;
};

export default FormatPrice;
