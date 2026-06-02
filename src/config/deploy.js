export const deployEnv = import.meta.env.VITE_DEPLOY_ENV || import.meta.env.MODE;

export const isProduction = deployEnv === "production";
export const isStaging = deployEnv === "staging";

export const stagingFeaturesEnabled =
  import.meta.env.VITE_ENABLE_STAGING_FEATURES === "true";
