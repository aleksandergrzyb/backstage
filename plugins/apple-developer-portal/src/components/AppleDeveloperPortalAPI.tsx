import { configApiRef, useApi } from '@backstage/core';
import axios, { AxiosResponse } from 'axios';

const requestAppleProgramInvitation = async (
  firstName: string,
  lastName: string,
  email: string,
  provisioningAllowed: boolean,
) => {
  const configApi = useApi(configApiRef);
  const axiosInstance = axios.create({
    baseURL: configApi.getString('appledeveloperportal.baseUrl'),
  });

  const result: AxiosResponse<any> = await axiosInstance.post(
    `v1/apple-developer-program-invitation/`,
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      provisioning_allowed: provisioningAllowed,
    },
  );
  return result;
};

export default requestAppleProgramInvitation;
