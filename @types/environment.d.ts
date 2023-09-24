/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_ORIGIN: string;
    NEXT_PUBLIC_API_HOST: string;
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string;
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: string;
    API_HEADER_TOKEN: string;
  }
}
