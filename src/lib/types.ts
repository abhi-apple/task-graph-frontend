export type CustomerType = {
  Cust_Type: string;
  count: number;
};

export type RawCustomerType = {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Cust_Type: string;
}

export type AccountIndustry = {
  Acct_Industry: string;
  count: number;
};

export type RawAccountIndustry = {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Acct_Industry: string;
}

export type Team = {
  Team: string;
  count: number;
};

export type RawTeam = {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Team: string;
}

export type AcvRange = {
  range: string;
  value: number;
  key: string;
};

export type RawAcvRange = {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  ACV_Range: string;
};