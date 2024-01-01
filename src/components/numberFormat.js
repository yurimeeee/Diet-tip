function FormatLongNumber(numbers) {
  if(numbers == 0) {
    return 0;
  }
  else
  {
      // hundreds
      if(numbers <= 999){
        return numbers;
      }
      // thousands
      else if(numbers >= 1000 && numbers <= 999999){
        return Math.round(numbers / 1000) + '천';
      }
      // millions
      else if(numbers >= 1000000 && numbers <= 999999999){
        return Math.round(numbers / 1000000) + '만';
      }
      else
        return numbers;
  }
}

export default FormatLongNumber