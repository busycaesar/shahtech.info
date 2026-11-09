const README_URL =
  "https://raw.githubusercontent.com/busycaesar/busycaesar/Master/README.md";

const ISSUERS = [
  { match: /databricks/i, name: "Databricks", domain: "databricks.com" },
  { match: /google/i, name: "Google Cloud", domain: "cloud.google.com" },
  { match: /microsoft|azure/i, name: "Microsoft", domain: "microsoft.com" },
  { match: /aws/i, name: "Amazon Web Services", domain: "aws.amazon.com" },
];

const findIssuer = (certificateName) => {
  const issuer = ISSUERS.find(({ match }) => match.test(certificateName));
  return issuer ? { name: issuer.name, domain: issuer.domain } : null;
};

export const getCertificates = async () => {
  const response = await fetch(README_URL);
  if (!response.ok) {
    throw new Error(`README ${README_URL} returned ${response.status}`);
  }

  const readme = await response.text();
  const section = readme.match(/##\s*Certificates\s*\n([\s\S]*?)(?:\n---|\n##\s)/);
  if (!section) {
    throw new Error(`No "## Certificates" section found in ${README_URL}`);
  }

  const entries = [...section[1].matchAll(/^\s*-\s*\[(.+?)\]\((\S+?)\)/gm)];
  if (entries.length === 0) {
    throw new Error(`No certificates listed in ${README_URL}`);
  }

  return entries.map(([, name, verifyUrl]) => ({
    name: name.trim(),
    verifyUrl,
    issuer: findIssuer(name),
  }));
};
