const cds = require('@sap/cds');
const { json } = require('@sap/cds/lib/compile/parse');
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = cds.service.impl(async function () {
  const { Educational_History, Educational_Details, SFData, SH_Institutes } = this.entities;

  this.on('sendEmail', async (req) => {
    try {
      const { to, cc, subject, html } = req.data;
 
      // Validate required fields — return proper 400
      if (!to || !subject || !html) {
        req.error(400, 'Missing required fields: to, subject and html.');
        return; // After req.error, CAP completes the response with 400
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
      
      let transporter;
      // Create transporter using environment variables
      if (process.env.SYSTEM === "PREVIEW") {
        transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });
      } else {
          transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT),
          secure: false
        });
      }

      // Prepare mail options
      const mailOptions = {
        from: process.env.SMTP_USER, // Always use the configured sender
        to,
        cc,
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
        error: error.message || "Unknown error while sending email"
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
      ic: data.ic,
      ichr: data.ichr,
      newfilename: data.newfilename,
      status: data.status,
      isnewcourse: data.isnewcourse,
      isfirstentry: data.isfirstentry,
      email: data.email,
      modifiedfields: data.modifiedfields,
      edu_details_key: data.ID,
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
      ic: data.ic,
      ichr: data.ichr,
      newfilename: data.newfilename,
      status: data.status,
      isnewcourse: data.isnewcourse,
      isfirstentry: data.isfirstentry,
      email: data.email,
      modifiedfields: data.modifiedfields,
      edu_details_key: data.ID,
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
        console.log("New entry added with externalCode:" + newCode)
        return { message: `New entry added with externalCode ${newCode}` };
      }
    } catch (error) {
      console.error("Error while adding new entry:", error);
      req.error(500, "Failed to add new entry. Please check logs for details.")
    }
  });

  this.on('DELETE', 'Educational_Details', async (req) => {
    const id = req.data.ID
    //const tx = cds.transaction(req);    
    try {
      await cds.run(DELETE.from(Educational_Details).where({ ID: id }));
      await cds.run(DELETE.from(Educational_History).where({ edu_details_key: id }));

      console.log("ID delted in Educational History Table:" + id);
    } catch (error) {
      console.error('Failed to insert into Educational_History:', error);
    }
  });

  this.on('updateSFData', async (req) => {
    const inputArray = req.data.data;

    if (!Array.isArray(inputArray) || inputArray.length === 0) {
      return "No data provided";
    }

    const tx = cds.transaction(req);
    let created = 0;
    let deleted = 0;

    try {
      const psidList = inputArray.map(record => record.psid).filter(Boolean);

      if (psidList.length === 0) {
        return req.error(400, "Missing PSID in input data");
      }

      // Delete all records with matching psid
      if (psidList.length > 0) {
        await tx.run(
          DELETE.from(SFData).where({ psid: { in: psidList } })
        );
        deleted = psidList.length;
      }
      // Insert new records
      for (const record of inputArray) {
        await tx.run(
          INSERT.into(SFData).entries(record)
        );
        created++;
      }

      const timestamp = new Date().toISOString();
      console.log(`Updated SF Data: [${timestamp}]: Deleted records: ${deleted}, Created records: ${created}`);

      return `Updated SF Data ${timestamp}. Deleted: ${deleted}, Created: ${created}`;
    } catch (error) {
      console.error("Error in updateSFData:", error);
      return req.error(500, `Failed to update SFData: ${error.message || error}`);
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

  // Helper to group by PSID and filter Q01 
  function processGroups(allRecords) {
    const psidGroups = {};

    allRecords.forEach(rec => {
      const psid = rec.psid;
      if (!psidGroups[psid])
        psidGroups[psid] = [];
      psidGroups[psid].push(rec);
    });

    const result = {
      PA: { count: 0, q01Records: [] },
      A: { count: 0, q01Records: [] },
      R: { count: 0, q01Records: [] },
      D: { count: 0, q01Records: [] },
      SA: { count: 0, q01Records: [] }
    };

    Object.values(psidGroups).forEach(records => {
      const uniqueStatuses = [...new Set(records.map(r => r.status))];

      if (uniqueStatuses.length === 1) {
        const status = uniqueStatuses[0];

        // Pick only cust_Qualification_Type === Q01
        const q01 = records.find(r => r.cust_Qualification_Type === "Q01");

        if (q01 && result[status]) {
          result[status].count++;
          result[status].q01Records.push(q01);
        }
      }
    });
    return result;
  }

  // 1. Get counts of all statuses (with Q01 filtering) 
  this.on("getAllUniformStatusCounts", async req => {
    try {
      const { ichr } = req.data;

      if (!ichr)
        return req.error(400, "Missing ichr");

      /*const allRecords = await SELECT.from(Educational_Details).where({ ichr: ichr });*/
      const allRecords = await SELECT.from(Educational_Details)
        .columns('psid','cust_Qualification_Type','status','name','ic','modifiedAt')
        .where({ ichr });
      const result = processGroups(allRecords);

      console.log("[getAllUniformStatusCounts] =>", JSON.stringify(result, null, 2));

      return result;

    } catch (error) {
      console.error("Error in getAllUniformStatusCounts:", error);
      // Return proper OData error format
      return req.error({
        code: "500",
        message: error.message || String(error)
      });
    }
  });

  // 2. Get records for one status (default PA or filter click) 
  this.on("getUniformStatusPsids", async req => {
    try {
      const { ichr, status } = req.data;

      if (!ichr || !status)
        return req.error(400, "Missing ichr or status");

      const allRecords = await SELECT.from(Educational_Details).where({ ichr: ichr, status });
      const grouped = processGroups(allRecords);
      console.log(`[getUniformStatusPsids:${status}] =>`, JSON.stringify(grouped[status], null, 2));

      return grouped[status];

    } catch (error) {
      console.error("Error in getUniformStatusPsids:", error);
      return req.error(error);
    }
  });

  // Helper: group records by PSID with uniform status
  function groupByPsid(records) {
    const psidGroups = {};
    for (const rec of records) {
      if (!psidGroups[rec.psid]) {
        psidGroups[rec.psid] = { status: rec.status, all: [rec], consistent: true };
      } else {
        if (psidGroups[rec.psid].status !== rec.status) {
          psidGroups[rec.psid].consistent = false;
        } psidGroups[rec.psid].all.push(rec);
      }
    }
    return psidGroups;
  }

  // 1. Action: Get counts of all statuses 
  this.on("getAllUniformStatusCounts0", async (req) => {
    const { ichr } = req.data;
    const allRecords = await SELECT.from(Educational_Details).where({ ichr: ichr });

    const groups = groupByPsid(allRecords);
    const results = {
      PA: { count: 0, q01Records: [] },
      A: { count: 0, q01Records: [] },
      R: { count: 0, q01Records: [] },
      D: { count: 0, q01Records: [] },
      SA: { count: 0, q01Records: [] }
    };

    for (const psid in groups) {
      const group = groups[psid];
      if (group.consistent) {
        results[group.status].count++;
        results[group.status].q01Records.push(...group.all);
      }
    }
    return results;
  });

  this.on('getAllUniformStatusCounts1', async req => {
    try {
      const { ichr, status } = req.data

      if (!ichr) {
        return req.error(400, "Missing ichr");
      }

      //Query DB with optional status filter Fetch all records for this ichr in one query
      let query = SELECT.from(Educational_Details).where({ ichr: ichr });
      if (status) {
        query = query.where({ status: status })
      }
      const allRecords = await cds.run(query);

      // Group by PSID
      const psidGroups = {};
      allRecords.forEach(rec => {
        if (!psidGroups[rec.psid]) psidGroups[rec.psid] = [];
        psidGroups[rec.psid].push(rec);
      });

      // Initialize result object
      const result = {
        PA: { count: 0, q01Records: [] },
        A: { count: 0, q01Records: [] },
        R: { count: 0, q01Records: [] }
      };

      // Process each psid group    
      Object.values(psidGroups).forEach(records => {
        const uniqueStatuses = [...new Set(records.map(r => r.status))];

        // If all statuses are uniform, increment corresponding bucket      
        if (uniqueStatuses.length === 1) {
          const status = uniqueStatuses[0];

          if (result[status]) {
            result[status].count++;

            const q01 = records.find(r => r.cust_Qualification_Type === "Q01");
            if (q01) {
              result[status].q01Records.push(q01);
            }
          }
        }
      });
      console.log("[getAllUniformStatusCounts] =>" + JSON.stringify(result, null, 2));
      return result;

    } catch (error) {
      console.error("Error in getAllUniformStatusCounts:", error);
      return req.error(error);
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
        isfirstentry: '',
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

// using below code I am able to get each PSID group count along with one PSID record on Status
/*this.on('getUniformStatusPsid', async req => {
  // Sample data (replace with DB query in production)
  const allRecords = [
    { PSID: "111111", status: "PA", cust_Qualification_Type: "Q01", ICHR: "999999" },
    { PSID: "111111", status: "PA", cust_Qualification_Type: "Q02", ICHR: "999999" },
    { PSID: "111111", status: "PA", cust_Qualification_Type: "Q03", ICHR: "999999" },
    { PSID: "222222", status: "PA", cust_Qualification_Type: "Q01", ICHR: "999999" },
    { PSID: "222222", status: "D", cust_Qualification_Type: "Q02", ICHR: "999999" },
    { PSID: "222222", status: "PA", cust_Qualification_Type: "Q03", ICHR: "999999" },
    { PSID: "333333", status: "PA", cust_Qualification_Type: "Q01", ICHR: "999999" },
    { PSID: "333333", status: "PA", cust_Qualification_Type: "Q02", ICHR: "999999" },
    { PSID: "333333", status: "PA", cust_Qualification_Type: "Q03", ICHR: "999999" },
    { PSID: "444444", status: "D", cust_Qualification_Type: "Q01", ICHR: "999999" },
    { PSID: "444444", status: "D", cust_Qualification_Type: "Q02", ICHR: "999999" },
    { PSID: "444444", status: "D", cust_Qualification_Type: "Q03", ICHR: "999999" }
  ];

  const ichr = req.data.ichr || "999999";
  const status = req.data.status || "PA";

  // Filter for the given ICHR
  const filteredRecords = allRecords.filter(rec => rec.ICHR === ichr);

  // Group by PSID
  const psidGroups = {};
  filteredRecords.forEach(rec => {
    if (!psidGroups[rec.PSID]) psidGroups[rec.PSID] = [];
    psidGroups[rec.PSID].push(rec);
  });

  // Prepare result: count and Q01 records
  let count = 0;
  let q01Records = [];
  Object.values(psidGroups).forEach(records => {
    const uniqueStatuses = [...new Set(records.map(r => r.status))];
    if (uniqueStatuses.length === 1 && uniqueStatuses[0] === status) {
      count++;
      // Find the record with cust_Qualification_Type === "Q01"
      const q01 = records.find(r => r.cust_Qualification_Type === "Q01");
      if (q01) {
        q01Records.push(q01);
        console.log("Q01:"+q01)
      }
    }
  });
  console.log("count:" +count)

  return { count, q01Records };
}); */

/*this.on('getUniformStatusPsids', async req => {
    try {
      const { ichr, status } = req.data

      if (!ichr || !status) {
        return req.error(400, "Missing required parameters: ichr and status");
      }

      // Query HANA table
      const allRecords = await cds.run(
        SELECT.from(Educational_Details).where({ ichr: ichr })
      );

      // Group by PSID
      const psidGroups = {};
      allRecords.forEach(rec => {
        if (!psidGroups[rec.psid]) psidGroups[rec.psid] = [];
        psidGroups[rec.psid].push(rec);
      });

      // Count PSIDs where all statuses are the same and match the requested status
      let count = 0;
      let q01Records = [];
      Object.values(psidGroups).forEach(records => {
        const uniqueStatuses = [...new Set(records.map(r => r.status))];
        if (uniqueStatuses.length === 1 && uniqueStatuses[0] === status) {
          count++;

          const q01 = records.find(r => r.cust_Qualification_Type === "Q01");
          if (q01) {
            q01Records.push(q01);
          }
        }
      });
      console.log("count:" + count)
      return { count, q01Records };

    } catch (error) {
      console.error("Error in getUniformStatusPsids:", error);
      return req.error(error);
    }
  });*/