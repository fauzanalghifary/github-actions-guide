const core = require("@actions/core");
// const github = require("@actions/github");
const exec = require("@actions/exec");

async function run() {
  // 1) Get some input values
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  //   2) Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const websiteUrl = `https://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
  core.setOutput("website-url", websiteUrl);
  core.notice("Deploying to S3");
}

run();
