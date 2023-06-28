class Post < ApplicationRecord
  has_many :comments
  accepts_nested_attributes_for :comments, allow_destroy: true
    def vid=(uploaded_io)
                            File.open(Rails.root.join('public', 'uploads', uploaded_io.original_filename), 'wb') do |file|
                                                                                            file.write(uploaded_io.read)

                                                                                                                 end
                                                                                write_attribute(:vid, uploaded_io.original_filename)
                                                                                                                                                                                  end
                  def vid
                                                            read_attribute(:vid)
                                                                                                                                          end
end
