
using com.lt.education as my from '../db/educational-schema';

@odata.maxPageSize: 1000
service EducationalService {
  entity Educational_Details as projection on my.Educational_Details;
  entity Educational_History as projection on my.Educational_History;
  entity SFData as projection on my.SFData;
  
  entity SH_Institutes as projection on my.SH_Institutes;
  action SH_InstitutesHANA() returns array of String;
  action sendEmail(to: String, subject: String, body: String) returns String;

  action createInDetailsTable(psid: String) returns String;
}