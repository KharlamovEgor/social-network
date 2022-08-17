export interface ImagesServiceInterface {
	load: (imageData: Blob, imageName: string) => Promise<boolean>;
}
