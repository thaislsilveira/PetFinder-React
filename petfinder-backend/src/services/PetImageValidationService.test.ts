import PetImageValidationService from './PetImageValidationService';

describe('PetImageValidationService', () => {
  it('rejects files whose stored extension is not an allow-listed image type, without inspecting content', async () => {
    const invalidFilename = await PetImageValidationService.validate([
      { storedFilename: 'some-uuid.html', originalFilename: 'pet.html' },
    ]);

    expect(invalidFilename).toBe('some-uuid.html');
  });

  it('rejects files with no extension at all', async () => {
    const invalidFilename = await PetImageValidationService.validate([
      { storedFilename: 'no-extension', originalFilename: 'no-extension' },
    ]);

    expect(invalidFilename).toBe('no-extension');
  });
});
