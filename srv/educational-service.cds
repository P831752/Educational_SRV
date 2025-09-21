using com.lt.education as my from '../db/educational-schema';

// type EmailInput : {
//   to : String; // comma-separated emails
// };

service EducationalService {

  entity Educational_Details as projection on my.Educational_Details;
  entity Educational_History as projection on my.Educational_History;
  entity SFData              as projection on my.SFData;
  entity SH_Institutes       as projection on my.SH_Institutes;
  
  action SH_InstitutesHANA(externalCode: String) returns array of String;
  action createInDetailsTable(psid: String)      returns String;

  action sendEmail(from: String,
                   to: String,
                   subject: String,
                   text: String,
                   html: String)                 
        returns {
          success   : Boolean;
          messageId : String;
          error     : String;
  };
}
