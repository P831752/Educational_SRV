const cds = require('@sap/cds');
const MailClient = require('@sap-cloud-sdk/mail-client');
const { json } = require('@sap/cds/lib/compile/parse');
require('dotenv').config();

module.exports = cds.service.impl(async function () {
  const { Educational_History, Educational_Details, SFData, SH_Institutes } = this.entities;

  this.on('sendEmail', async (req) => {
    const { to, subject, text } = req.data;

    try {
      console.log("Mail:"+JSON.stringify(MailClient));

      const mailClient = MailClient.forDestination(process.env.DESTINATION_NAME);
      await mailClient.send({
        from: process.env.EMAIL_FROM,
        to: [to],
        subject,
        text
      });
      return 'Email sent successfully';
    } catch (error) {
      console.error('Error sending email:', error);
      return `Failed to send email: ${error.message}`;
    }
  });

  this.after('CREATE', 'Educational_Details', async (data, req) => {
    const tx = cds.transaction(req);
    console.log("data:" + JSON.stringify(data));

    const eduDetails = {
      psid: data.psid,
      name: data.name,
      comments: data.comments,
      status: data.status,
      ic: data.status,
      ichr: data.status,
      isnewcourse: data.isnewcourse,
      ismodified: data.ismodified,
      newname: data.newname,
      modifiedfields: data.modifiedfields,
      cust_Qualification_Type: data.cust_Qualification_Type,
      Qualification_Type_Desc: data.Qualification_Type_Desc,
      cust_Duration_Of_The_Course: data.cust_Duration_Of_The_Course,
      cust_Institute: data.cust_Institute,
      cust_Institute_Desc: data.cust_Institute_Desc,
      cust_Year_of_Passing: data.cust_Year_of_Passing,
      cust_University: data.cust_University,
      University_Desc: data.University_Desc,
      cust_CGPA: data.cust_CGPA,
      cust_Percentage: data.cust_Percentage,
      cust_Division: data.cust_Division,
      Division_Desc: data.Division_Desc,
      cust_Type_Of_The_Course: data.cust_Type_Of_The_Course,
      Type_Of_The_Course_Desc: data.Type_Of_The_Course_Desc,
      cust_Grade: data.cust_Grade,
      Grade_Desc: data.Grade_Desc,
      cust_Qualification_Sub_Type: data.cust_Qualification_Sub_Type,
      Qualification_Sub_Desc: data.Qualification_Sub_Desc,
      cust_Education_Certificate: data.cust_Education_Certificate,
      Education_Certificate_Desc: data.Education_Certificate_Desc,
      cust_Branch_1: data.cust_Branch_1,
      Branch_1_Desc: data.Branch_1_Desc,
      cust_Branch_2: data.cust_Branch_2,
      Branch_2_Desc: data.Branch_2_Desc,
      cust_Academic_End_Date: data.cust_Academic_End_Date,
      cust_Academic_Start_Date: data.cust_Academic_Start_Date,
      externalCode: data.externalCode,
      ParentLegacy_effectiveStartDate: data.ParentLegacy_effectiveStartDate
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
    console.log("updated data:" + JSON.stringify(data));

    const eduDetails = {
      psid: data.psid,
      name: data.name,
      comments: data.comments,
      status: data.status,
      ic: data.status,
      ichr: data.status,
      isnewcourse: data.isnewcourse,
      ismodified: data.ismodified,
      newname: data.newname,
      modifiedfields: data.modifiedfields,
      cust_Qualification_Type: data.cust_Qualification_Type,
      Qualification_Type_Desc: data.Qualification_Type_Desc,
      cust_Duration_Of_The_Course: data.cust_Duration_Of_The_Course,
      cust_Institute: data.cust_Institute,
      cust_Institute_Desc: data.cust_Institute_Desc,
      cust_Year_of_Passing: data.cust_Year_of_Passing,
      cust_University: data.cust_University,
      University_Desc: data.University_Desc,
      cust_CGPA: data.cust_CGPA,
      cust_Percentage: data.cust_Percentage,
      cust_Division: data.cust_Division,
      Division_Desc: data.Division_Desc,
      cust_Type_Of_The_Course: data.cust_Type_Of_The_Course,
      Type_Of_The_Course_Desc: data.Type_Of_The_Course_Desc,
      cust_Grade: data.cust_Grade,
      Grade_Desc: data.Grade_Desc,
      cust_Qualification_Sub_Type: data.cust_Qualification_Sub_Type,
      Qualification_Sub_Desc: data.Qualification_Sub_Desc,
      cust_Education_Certificate: data.cust_Education_Certificate,
      Education_Certificate_Desc: data.Education_Certificate_Desc,
      cust_Branch_1: data.cust_Branch_1,
      Branch_1_Desc: data.Branch_1_Desc,
      cust_Branch_2: data.cust_Branch_2,
      Branch_2_Desc: data.Branch_2_Desc,
      cust_Academic_End_Date: data.cust_Academic_End_Date,
      cust_Academic_Start_Date: data.cust_Academic_Start_Date,
      externalCode: data.externalCode,
      ParentLegacy_effectiveStartDate: data.ParentLegacy_effectiveStartDate
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

  this.on('SH_InstitutesHANA', async (req) => {
    try {
      const tx = cds.transaction(req);
      const shEntries = await tx.run(SELECT.from(SH_Institutes));

      if (!shEntries || shEntries.length === 0) {
        return `Error: No entries found`;
      }
      console.log("shEntries:" + shEntries.length)
      return shEntries;

    } catch (error) {
      console.error('Error in :', error);
      return `An error occurred in SH_InstitutesHANA: ${error.message}`;
    }
  });

  this.on('createInDetailsTable', async (req) => {

    try {
      const { psid } = req.data;
      const tx = cds.transaction(req);

      // Step 1: Fetch entries from SFData with given psid
      const sfEntries = await tx.run(
        SELECT.from(SFData).where({ psid })
      );

      if (!sfEntries || sfEntries.length === 0) {
        return `Error: No entries found for psid: ${psid}`;
      }

      // Step 2: Delete existing entries in Educational_Details for the same psid
      await tx.run(
        DELETE.from('Educational_Details').where({ psid })
      );

      // Step 3: Transform entries to match Educational_Details structure
      const transformedEntries = sfEntries.map(entry => ({
        psid: entry.psid,
        cust_Qualification_Type: entry.cust_Qualification_Type,
        Qualification_Type_Desc: entry.Qualification_Type_Desc,
        cust_Duration_Of_The_Course: entry.cust_Duration_Of_The_Course,
        cust_Institute: entry.cust_Institute,
        cust_Institute_Desc: entry.cust_Institute_Desc,
        cust_Year_of_Passing: entry.cust_Year_of_Passing,
        cust_University: entry.cust_University,
        University_Desc: entry.University_Desc,
        cust_CGPA: entry.cust_CGPA,
        cust_Percentage: entry.cust_Percentage,
        cust_Division: entry.cust_Division,
        Division_Desc: entry.Division_Desc,
        cust_Type_Of_The_Course: entry.cust_Type_Of_The_Course,
        Type_Of_The_Course_Desc: entry.Type_Of_The_Course_Desc,
        cust_Grade: entry.cust_Grade,
        Grade_Desc: entry.Grade_Desc,
        cust_Qualification_Sub_Type: entry.cust_Qualification_Sub_Type,
        Qualification_Sub_Desc: entry.Qualification_Sub_Desc,
        cust_Education_Certificate: entry.cust_Education_Certificate,
        Education_Certificate_Desc: entry.Education_Certificate_Desc,
        cust_Branch_1: entry.cust_Branch_1,
        Branch_1_Desc: entry.Branch_1_Desc,
        cust_Branch_2: entry.cust_Branch_2,
        Branch_2_Desc: entry.Branch_2_Desc,
        cust_Academic_End_Date: entry.cust_Academic_End_Date,
        cust_Academic_Start_Date: entry.cust_Academic_Start_Date,
        externalCode: entry.externalCode,
        ParentLegacy_effectiveStartDate: entry.ParentLegacy_effectiveStartDate,

        // Additional fields in Educational_Details
        name: '', // default or derived value
        comments: '',
        ic: '',
        ichr: '',
        status: 'SA',
        isnewcourse: '',
        ismodified: '',
        modifiedfields: '',
        newname: ''
      }));

      // Step 3: Insert into Educational_Details
      await tx.run(
        INSERT.into(Educational_Details).entries(transformedEntries)
      );

      return `${transformedEntries.length} entries copied to Educational_Details.`;

    } catch (error) {
      console.error('Error in CopySFDataToEducationalDetails:', error);
      return `An error occurred: ${error.message}`;
    }


  });
});
