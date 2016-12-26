import { CountablePage } from './app.po';

describe('countable App', function() {
  let page: CountablePage;

  beforeEach(() => {
    page = new CountablePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
