export const TIPO_IDENTIFICACION = {
  TARJETA_IDENTIDAD: '12',
  CEDULA_CIUDADANIA: '13',
  TARJETA_EXTRANJERIA: '21',
  CEDULA_EXTRANJERIA: '22',
  NIT: '31',
  PASAPORTE: '41',
  DOC_IDENT_EXTRANJERO: '42',
  SIN_IDENT_DIAN: '43',
  DOC_ID_EXT_PJ: '44',
} as const;

export const TRATAMIENTOS = {
  DISTRIBUIDOR: '0013',
  ARQUITECTO: '0006',
  MAESTRO: '0007',
  EMPRESA: '0003',
  INGENIERO: '0005',
  CONTRATISTA: '0009',
  DISENADOR: '0008',
  SENOR: '0002',
  SENOR_SENORA: '0004',
  SENORA: '0001',
} as const;

export const CLASE_IMPUESTO = {
  PERSONA_NATURAL: 'PN',
  PERSONA_JURIDICA: 'PJ',
} as const;

export const TIPO_IDENTIFICACION_OPTIONS = [
  { value: TIPO_IDENTIFICACION.TARJETA_IDENTIDAD, label: 'Tarjeta de Identidad' },
  { value: TIPO_IDENTIFICACION.CEDULA_CIUDADANIA, label: 'Cedula Ciudadania' },
  { value: TIPO_IDENTIFICACION.TARJETA_EXTRANJERIA, label: 'Tarjeta de Extranjería' },
  { value: TIPO_IDENTIFICACION.CEDULA_EXTRANJERIA, label: 'Cédula de Extranjería' },
  { value: TIPO_IDENTIFICACION.NIT, label: 'NIT' },
  { value: TIPO_IDENTIFICACION.PASAPORTE, label: 'Pasaporte' },
  { value: TIPO_IDENTIFICACION.DOC_IDENT_EXTRANJERO, label: 'Documento de ident extran' },
  { value: TIPO_IDENTIFICACION.SIN_IDENT_DIAN, label: 'Sin Identif del exter DIAN' },
  { value: TIPO_IDENTIFICACION.DOC_ID_EXT_PJ, label: 'Documento id extr PJ' },
];

export const TRATAMIENTO_OPTIONS = [
  { value: TRATAMIENTOS.DISTRIBUIDOR, label: 'DISTRIBUIDOR-IMPORTADORA' },
  { value: TRATAMIENTOS.ARQUITECTO, label: 'ARQUITECTO/A' },
  { value: TRATAMIENTOS.MAESTRO, label: 'MAESTRO/A' },
  { value: TRATAMIENTOS.EMPRESA, label: 'EMPRESA' },
  { value: TRATAMIENTOS.INGENIERO, label: 'INGENIERO/A' },
  { value: TRATAMIENTOS.CONTRATISTA, label: 'CONTRATISTA' },
  { value: TRATAMIENTOS.DISENADOR, label: 'DISEÑADOR/A' },
  { value: TRATAMIENTOS.SENOR, label: 'SEÑOR' },
  { value: TRATAMIENTOS.SENOR_SENORA, label: 'SEÑOR-SEÑORA' },
  { value: TRATAMIENTOS.SENORA, label: 'SEÑORA' },
];

export const CLASE_IMPUESTO_OPTIONS = [
  { value: CLASE_IMPUESTO.PERSONA_NATURAL, label: 'Persona Natural' },
  { value: CLASE_IMPUESTO.PERSONA_JURIDICA, label: 'Persona Juridica' },
];