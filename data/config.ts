interface AppConfig {
  server: string;
}

const config: AppConfig = {
  server: `https://api.0x.org`,
};
for (const [key, value] of Object.entries(config)) {
  if (!value) {
    console.log(
      `[-] Environmental varialbe ${key} is not set. Application might not funtion properly.`
    );
  }
}
export default config;
