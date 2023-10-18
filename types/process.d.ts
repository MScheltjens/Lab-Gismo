declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    GOOGLE_ID: string;
    GOOGLE_SECRET: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;

    DATABASE_URL: string;
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
  }
}
