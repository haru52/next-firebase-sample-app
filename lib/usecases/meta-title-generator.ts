export default class MetaTitleGenerator {
  static run(title?: string) {
    const commonTitle = 'Next.js Firebase Sample App';
    return title === undefined ? commonTitle : `${title} - ${commonTitle}`;
  }
}
