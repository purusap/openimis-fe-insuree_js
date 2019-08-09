import { graphql, formatQuery, formatPageQuery } from "@openimis/fe-core";

export function fetchInsuree(chfid) {
  let payload = formatQuery("insuree",
    [`chfId:"${chfid}"`],
    ["chfId", "lastName", "otherNames", "dob", "age",
      "family{id}",
      "photo{folder,filename}",
      "gender{code, gender, altLanguage}",
      "healthFacility{id, code, name}"]
  );
  return graphql(payload, 'INSUREE_ENQUIRY');
}

export function fetchInsureeFamily(chfid) {
  let payload = formatPageQuery("insureeFamilyMembers",
    [`chfId:"${chfid}"`],
    ["chfId", "otherNames", "lastName", "head", "phone"]
  );
  return graphql(payload, 'INSUREE_FAMILY');
}