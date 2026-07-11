import imagesView from './images_view';

describe('imagesView', () => {
  it('renders an image with the uploads base url', () => {
    const image = { id: 1, path: 'dog.png' } as Parameters<
      typeof imagesView.render
    >[0];

    expect(imagesView.render(image)).toEqual({
      id: 1,
      url: 'http://localhost:3333/uploads/dog.png',
    });
  });

  it('renders many images', () => {
    const images = [
      { id: 1, path: 'dog.png' },
      { id: 2, path: 'cat.png' },
    ] as Parameters<typeof imagesView.renderMany>[0];

    expect(imagesView.renderMany(images)).toEqual([
      { id: 1, url: 'http://localhost:3333/uploads/dog.png' },
      { id: 2, url: 'http://localhost:3333/uploads/cat.png' },
    ]);
  });
});
