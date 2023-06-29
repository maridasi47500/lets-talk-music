class Piece < ApplicationRecord
  belongs_to :composer
    def image=(uploaded_io)
                      File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
                                                              file.write(uploaded_io.read)
                                                                                                                            end
                                                    write_attribute(:image, uploaded_io.original_filename)
                                                                                                  end
              def image
                                        read_attribute(:image)
                                                                              end
end
