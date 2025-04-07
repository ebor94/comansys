/**
 * Formatea un número con separadores de miles y decimales
 * @param value - Número a formatear
 * @param decimals - Cantidad de decimales (por defecto 2)
 * @returns String formateado
 */
export const formatNumber = (value: number | string, decimals: number = 2): string => {
  // Convertir a número si es string
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Si no es un número válido, retornar 0 formateado
  if (isNaN(num)) {
    return (0).toFixed(decimals);
  }

  // Formatear con separadores de miles y decimales
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

/**
 * Formatea un valor monetario
 * @param value - Valor a formatear
 * @param currency - Moneda (por defecto COP)
 * @returns String formateado con símbolo de moneda
 */
export const formatCurrency = (value: number | string, currency: string = 'COP'): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return `$ ${(0).toFixed(2)}`;
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

/**
 * Formatea una fecha a string
 * @param date - Fecha a formatear
 * @param includeTime - Si debe incluir la hora
 * @returns String con la fecha formateada
 */
export const formatDate = (date: Date | string, includeTime: boolean = false): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...(includeTime && {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  };

  return new Intl.DateTimeFormat('es-CO', options).format(dateObj);
};

/**
 * Formatea un porcentaje
 * @param value - Valor a formatear
 * @param decimals - Cantidad de decimales
 * @returns String con el porcentaje formateado
 */
export const formatPercentage = (value: number | string, decimals: number = 1): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return `0%`;
  }

  return `${num.toFixed(decimals)}%`;
};

/**
 * Formatea un número como cantidad de unidades
 * @param value - Valor a formatear
 * @param unit - Unidad de medida
 * @returns String con la cantidad formateada
 */
export const formatQuantity = (value: number | string, unit: string = ''): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) {
    return `0 ${unit}`;
  }

  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);

  return unit ? `${formatted} ${unit}` : formatted;
};