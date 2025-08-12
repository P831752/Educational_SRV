const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
  const { Educational_History } = this.entities;

  this.after('CREATE', 'Educational_Details', async (data, req) => {
    const tx = cds.transaction(req);
    console.log("data:" +JSON.stringify(data));

    const eduDetails = {
      // PSID: data.PSID,
      // course: data.course,
      // qualificationSubType: data.qualificationSubType,
      // educationCertificate: data.educationCertificate,
      // branch1: data.branch1,
      // branch2: data.branch2,
      // yearOfPassing: data.yearOfPassing,
      // institution: data.institution,
      // boardOrUniversity: data.boardOrUniversity,
      // courseType: data.courseType,
      // duration: data.duration,
      // percentage: data.percentage,
      // cgpa: data.cgpa,
      // division: data.division,
      // grade: data.grade,
      // status: data.status,
      // dmsfoldername: data.dmsfoldername,
      // ismodified: data.ismodified

      psid:data.psid,
      qua_subtype_code:data.qua_subtype_code,
      qua_subtype_desc:data.qua_subtype_desc,
      edu_cert_code:data.edu_cert_code,
      educ_cert_desc:data.educ_cert_desc,
      branch1_code:data.branch1_code,
      branch1_desc:data.branch1_desc,
      branch2_code:data.branch2_code,
      branch2_desc:data.branch2_desc,
      yearofpassing:data.yearofpassing,
      inst_code:data.inst_code,
      inst_desc:data.inst_desc,
      univ_code:data.univ_code,
      univ_desc:data.univ_desc,
      course_code:data.course_code,
      course_desc:data.course_desc,
      duration:data.duration,
      percentage:data.percentage, //Decimal(5,2); // or CGPA
      cgpa:data.cgpa,//Decimal(5,2); // or CGPA
      div_code:data.div_code,
      div_desc:data.div_desc,
      grade_code:data.grade_code,
      grade_desc:data.grade_desc,
      status:data.status,
      dmsfoldername:data.dmsfoldername,
      ismodified:data.ismodified
    };

    try {
      await tx.run(
        INSERT.into(Educational_History).entries(eduDetails)
      );
      console.log("Educational_History created");
    } catch (error) {
      console.error('Failed to insert into Educational_History:', error);
    }
  });

  this.after('UPDATE', 'Educational_Details', async (data, req) => {
    const tx = cds.transaction(req);
    console.log("updated data:" +JSON.stringify(data));

    const eduDetails = {
      PSID: data.PSID,
      course: data.course,
      qualificationSubType: data.qualificationSubType,
      educationCertificate: data.educationCertificate,
      branch1: data.branch1,
      branch2: data.branch2,
      yearOfPassing: data.yearOfPassing,
      institution: data.institution,
      boardOrUniversity: data.boardOrUniversity,
      courseType: data.courseType,
      duration: data.duration,
      percentage: data.percentage,
      cgpa: data.cgpa,
      division: data.division,
      grade: data.grade,
      status: data.status,
      dmsfoldername: data.dmsfoldername,
      ismodified: data.ismodified
    };

    try {
      await tx.run(
        INSERT.into(Educational_History).entries(eduDetails)
      );
      console.log("Educational_History updated");
    } catch (error) {
      console.error('Failed to insert into Educational_History:', error);
    }
  });

});
 