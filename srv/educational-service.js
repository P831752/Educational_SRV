const cds = require('@sap/cds');
const { json } = require('@sap/cds/lib/compile/parse');
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = cds.service.impl(async function () {
  const { Educational_History, Educational_Details, SFData, SH_Institutes } = this.entities;

this.on('sendEmail', async (req) => {
  try {
    const { to, subject, text, html } = req.data;

    // Validate required fields
    if (!to || !subject || (!html)) {
      return {
        success: false,
        messageId: null,
        error: "Missing required fields: to, subject, and either text or html body."
      };
    }

      /*const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: "587",
        secure: false,
        auth: {
          user: "citsap-btpdev@larsentoubro.com",
          pass: "SAP#btp2025"
        }
      });*/

    // Create transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_USER, // Always use the configured sender
      to,                          // Comma-separated emails supported
      subject,
      html
    };

    console.log("Sending email with options:", mailOptions);

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error("Error sending mail:", error);
    return {
      success: false,
      messageId: null,
      error: error.message
    };
  }
});



  this.after('CREATE', 'Educational_Details', async (data, req) => {
    const tx = cds.transaction(req);
    console.log("data:" + JSON.stringify(data));

    const eduDetails = {
      psid: data.psid,
      name: data.name,
      comments: data.comments,
      ic: data.status,
      ichr: data.status,
      newfilename: data.newfilename,
      status: data.status,
      isnewcourse: data.isnewcourse,
      email:data.email,
      modifiedfields: data.modifiedfields,
      cust_Qualification_Type: data.cust_Qualification_Type,
      Qualification_Type_Desc: data.Qualification_Type_Desc,
      cust_Duration_Of_The_Course: data.cust_Duration_Of_The_Course,
      cust_Institute: data.cust_Institute,
      Institute_Desc: data.Institute_Desc,
      cust_Year_of_Passing: data.cust_Year_of_Passing,
      cust_University: data.cust_University,
      University_Desc: data.University_Desc,
      cust_CGPA: data.cust_CGPA,
      CGPA_Desc: data.CGPA_Desc,
      cust_Percentage: data.cust_Percentage,
      Percentage_Desc: data.Percentage_Desc,
      cust_Division: data.cust_Division,
      Division_Desc: data.Division_Desc,
      cust_Type_Of_The_Course: data.cust_Type_Of_The_Course,
      Type_Of_The_Course_Desc: data.Type_Of_The_Course_Desc,
      cust_Grade: data.cust_Grade,
      Grade_Desc: data.Grade_Desc,
      cust_Qualification_Sub_Type: data.cust_Qualification_Sub_Type,
      Qualification_Sub_Type_Desc: data.Qualification_Sub_Type_Desc,
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
      ic: data.status,
      ichr: data.status,
      newfilename: data.newfilename,
      status: data.status,
      isnewcourse: data.isnewcourse,
      email:data.email,
      modifiedfields: data.modifiedfields,
      cust_Qualification_Type: data.cust_Qualification_Type,
      Qualification_Type_Desc: data.Qualification_Type_Desc,
      cust_Duration_Of_The_Course: data.cust_Duration_Of_The_Course,
      cust_Institute: data.cust_Institute,
      Institute_Desc: data.Institute_Desc,
      cust_Year_of_Passing: data.cust_Year_of_Passing,
      cust_University: data.cust_University,
      University_Desc: data.University_Desc,
      cust_CGPA: data.cust_CGPA,
      CGPA_Desc: data.CGPA_Desc,
      cust_Percentage: data.cust_Percentage,
      Percentage_Desc: data.Percentage_Desc,
      cust_Division: data.cust_Division,
      Division_Desc: data.Division_Desc,
      cust_Type_Of_The_Course: data.cust_Type_Of_The_Course,
      Type_Of_The_Course_Desc: data.Type_Of_The_Course_Desc,
      cust_Grade: data.cust_Grade,
      Grade_Desc: data.Grade_Desc,
      cust_Qualification_Sub_Type: data.cust_Qualification_Sub_Type,
      Qualification_Sub_Type_Desc: data.Qualification_Sub_Type_Desc,
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

    //Add new institute into SH_Institutes table
    try {      
      if (data.status === "A" && data.cust_Institute === "IT00000") {
        const result = await tx.run(
          SELECT.one.from(SH_Institutes).columns('externalCode').orderBy('externalCode desc')
        );
        /*const lastCode = result?.externalCode || 0;
        const newCode = lastCode + 1*/

        let newCode = 'IT00000';

        if (result?.externalCode) {
          const prefix = result.externalCode.match(/^[A-Za-z]+/)[0]; // e.g., "IT"
          const number = parseInt(result.externalCode.replace(prefix, ''), 10); // e.g., 53314
          const nextNumber = number + 1;
          newCode = `${prefix}${nextNumber}`;
        }

        // Insert new record
        await tx.run(
          INSERT.into(SH_Institutes).entries({
            externalCode: newCode,
            externalName: data.Institute_Desc
          })
        );
        console.log("New entry added with externalCode:" +newCode)
        return { message: `New entry added with externalCode ${newCode}` };
      }
    } catch (error) {
      console.error("Error while adding new entry:", error);
      req.error(500, "Failed to add new entry. Please check logs for details.")
    }
  });

  this.on('SH_InstitutesHANA', async (req) => {
    try {
      const { externalCode } = req.data;
      const tx = cds.transaction(req);

      let shEntries
      if (externalCode === "")
        shEntries = await tx.run(SELECT.from(SH_Institutes));
      else
        shEntries = await tx.run(SELECT.from(SH_Institutes).where({ externalCode }));

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
        Institute_Desc: entry.Institute_Desc,
        cust_Year_of_Passing: entry.cust_Year_of_Passing,
        cust_University: entry.cust_University,
        University_Desc: entry.University_Desc,
        cust_CGPA: entry.cust_CGPA,
        CGPA_Desc: entry.CGPA_Desc,
        cust_Percentage: entry.cust_Percentage,
        Percentage_Desc: entry.Percentage_Desc,
        cust_Division: entry.cust_Division,
        Division_Desc: entry.Division_Desc,
        cust_Type_Of_The_Course: entry.cust_Type_Of_The_Course,
        Type_Of_The_Course_Desc: entry.Type_Of_The_Course_Desc,
        cust_Grade: entry.cust_Grade,
        Grade_Desc: entry.Grade_Desc,
        cust_Qualification_Sub_Type: entry.cust_Qualification_Sub_Type,
        Qualification_Sub_Type_Desc: entry.Qualification_Sub_Type_Desc,
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
        newfilename: '',
        status: 'SA',
        isnewcourse: '',
        modifiedfields: '',
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
