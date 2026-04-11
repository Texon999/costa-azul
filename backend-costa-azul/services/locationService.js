import * as locationRepository from '../repositories/locationRepository.js'

export const getLocations = async () => {
  return await locationRepository.getlocations()
}
