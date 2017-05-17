export class TruncateValueConverter {
  toView(value) {
    if (value.length > 50) {
      return value.substring(0, 50) + '...';
    }

    return value;
  }
}
