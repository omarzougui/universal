import { UnversalPage } from './app.po';

describe('unversal App', () => {
  let page: UnversalPage;

  beforeEach(() => {
    page = new UnversalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
