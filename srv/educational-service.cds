using com.lt.education as my from '../db/educational-schema';

service EducationalService {

  entity Educational_Details as projection on my.Educational_Details;
  entity Educational_History as projection on my.Educational_History;
  entity SFData              as projection on my.SFData;
  entity SH_Institutes       as projection on my.SH_Institutes;

  action SH_InstitutesHANA(externalCode: String)             returns array of String;
  action createInDetailsTable(psid: String)                  returns String;

  action updateSFData(data: array of SFData)              
    returns {
      created : Integer;
      updated : Integer;
  };
 type StatusResult {
    count      : Integer;
    q01Records : many Q01Record;
  };
    // Action returning all statuses
  action getAllUniformStatusCounts(ichr: String) returns {
    PA : StatusResult;
    A  : StatusResult;
    R  : StatusResult;
  };

    action getUniformStatusPsids(ichr: String, status: String) returns {
    PA : StatusResult;
    A  : StatusResult;
    R  : StatusResult;
  };

  action sendEmail(from: String,
                   to: String,
                   cc: String,
                   subject: String,
                   html: String)                             returns {
    success   : Boolean;
    messageId : String;
    error     : String;
  };
}

type Q01Record {
  PSID                    : String;
  status                  : String;
  cust_Qualification_Type : String;
  ICHR                    : String;
}


