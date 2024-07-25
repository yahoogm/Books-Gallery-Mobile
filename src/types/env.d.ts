declare module 'react-native-config' {
  interface Env {
    API_URL: string;
    API_KEY: string;
    WEB_API_KEY: string;
  }

  const Config: Env;

  export default Config;
}
