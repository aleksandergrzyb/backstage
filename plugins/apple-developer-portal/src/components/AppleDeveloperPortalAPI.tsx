/*
 * Copyright 2021 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import axios, { AxiosResponse } from 'axios';

export const requestAppleProgramInvitation = async (
  baseURL: string,
  firstName: string,
  lastName: string,
  email: string,
  provisioningAllowed: boolean,
) => {
  const axiosInstance = axios.create({
    baseURL,
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
