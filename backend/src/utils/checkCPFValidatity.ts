const checkCPFValidity = (parsedCPF: string) => {
  let isCPFValid = true;
  let sum = 0;
  let module = 0;

  if (parsedCPF === "00000000000") {
    isCPFValid = false;
  } else {
    for (let i = 0; i < 9; i++) {
      sum += Number(parsedCPF.charAt(i)) * (10 - i);
    }

    module = (sum * 10) % 11;

    if (module === 10 || module === 11) module = 0;

    if (String(module) !== parsedCPF.charAt(9)) {
      isCPFValid = false;
    } else {
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(parsedCPF.charAt(i)) * (11 - i);
      }

      module = (sum * 10) % 11;

      if (module === 10 || module === 11) module = 0;

      if (String(module) !== parsedCPF.charAt(10)) {
        isCPFValid = false;
      }
    }
  }

  return isCPFValid;
};

export default checkCPFValidity;
