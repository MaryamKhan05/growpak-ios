import { gql } from "@apollo/client";

export const GET_PH = (data) => {
  return gql`
     query {
      retrievePlantHealth(
         polygonId: "${data.id}"
         startDate:"${data.startDate}"
         endDate:"${data.endDate}"
       ) {
         IsSuccess
         Message
         Status
         Result {
           tif
           png
           bbox
           center
           colorlegend
           geometry
         }
       }
     }
   `;
};
export const GET_SOC = (data) => {
  return gql`
     query {
      retrieveSoilOrganicCarbon(
         polygonId: "${data.id}"
         startDate:"${data.startDate}"
         endDate:"${data.endDate}"
       ) {
         IsSuccess
         Message
         Status
         Result {
           tif
           png
           bbox
           center
           colorlegend
           geometry
         }
       }
     }
   `;
};
export const GET_WS = (data) => {
  return gql`
     query {
      retrieveWaterStress(
         polygonId: "${data.id}"
         startDate:"${data.startDate}"
         endDate:"${data.endDate}"
       ) {
         IsSuccess
         Message
         Status
         Result {
           tif
           png
           bbox
           center
           colorlegend
           geometry
         }
       }
     }
   `;
};
