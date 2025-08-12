namespace com.lt.education;
using { cuid, managed } from '@sap/cds/common';

entity Employee {
     key PSID  : String(100);
      name     : String(100);
      grade    : String(50);
      IC       : String(100); // optional unique ID
}

entity Educational_Details : cuid, managed {
      psid   : String(100);
      qua_subtype_code:String(100);
      qua_subtype_desc:String(100);
      edu_cert_code:String(100);
      educ_cert_desc:String(100);
      branch1_code:String(100);
      branch1_desc:String(100);
      branch2_code:String(100);
      branch2_desc:String(100);
      yearofpassing  : Integer;
      inst_code:String(100);
      inst_desc:String(100);
      univ_code:String(100);
      univ_desc:String(100);
      coursetype_code : String(100);
      coursetype_desc : String(100);
      duration   : String(100);
      percentage : Decimal(5,2); // or CGPA
      cgpa     : Decimal(5,2); // or CGPA
      div_code : String(100);
      div_desc : String(100);
      grade_code : String(100);
      grade_desc : String(100);
      status: String(100);
      dmsfoldername :String(100);
      ismodified :String(10);
}

//only create operation
entity Educational_History : cuid, managed {
      psid   : String(100);
      qua_subtype_code:String(100);
      qua_subtype_desc:String(100);
      edu_cert_code:String(100);
      educ_cert_desc:String(100);
      branch1_code:String(100);
      branch1_desc:String(100);
      branch2_code:String(100);
      branch2_desc:String(100);
      yearofpassing  : Integer;
      inst_code:String(100);
      inst_desc:String(100);
      univ_code:String(100);
      univ_desc:String(100);
      coursetype_code : String(100);
      coursetype_desc : String(100);
      duration   : String(100);
      percentage : Decimal(5,2); // or CGPA
      cgpa     : Decimal(5,2); // or CGPA
      div_code : String(100);
      div_desc : String(100);
      grade_code : String(100);
      grade_desc : String(100);
      status: String(100);
      dmsfoldername :String(100);
      ismodified :String(10);
}

entity SFData : cuid, managed {
       PSID   : String(100);
      //student        : Association to Students;
      //certificate    : Association to CertificateTypes;
      course : String(100);
      qualificationSubType  : String(100);
      educationCertificate  : String(100);
      branch1    : String(100);
      branch2    : String(100);
      yearOfPassing  : Integer;
      institution    : String(100);
      boardOrUniversity : String(100);
      courseType    : String(100);
      duration   : String(100);
      percentage     : Decimal(5,2); // or CGPA
      cgpa     : Decimal(5,2); // or CGPA
      division   : String(100);
      grade   : String(100);
}
