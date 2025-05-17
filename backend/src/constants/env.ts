const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4000");
export const DB_HOST = getEnv("DB_HOST", "localhost");
export const DB_PORT = getEnv("DB_PORT", "5432");
export const DB_USERNAME = getEnv("DB_USERNAME");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
export const DB_NAME = getEnv("DB_NAME");
