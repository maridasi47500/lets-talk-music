class ComposersController < ApplicationController
  before_action :set_composer, only: %i[ show edit update destroy ]

  # GET /composers or /composers.json
  def index
    @composers = Composer.all.where("lower(name) like ?","%"+params[:name].to_s.downcase+"%")
  end

  # GET /composers/1 or /composers/1.json
  def show
  end

  # GET /composers/new
  def new
    @composer = Composer.new
  end

  # GET /composers/1/edit
  def edit
  end

  # POST /composers or /composers.json
  def create
    @composer = Composer.new(composer_params)

    respond_to do |format|
      if @composer.save
        format.html { redirect_to composer_url(@composer), notice: "Composer was successfully created." }
        format.json { render :show, status: :created, location: @composer }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @composer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /composers/1 or /composers/1.json
  def update
    respond_to do |format|
      if @composer.update(composer_params)
        format.html { redirect_to composer_url(@composer), notice: "Composer was successfully updated." }
        format.json { render :show, status: :ok, location: @composer }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @composer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /composers/1 or /composers/1.json
  def destroy
    @composer.destroy

    respond_to do |format|
      format.html { redirect_to composers_url, notice: "Composer was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_composer
      @composer = Composer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def composer_params
      params.require(:composer).permit(:name, :image)
    end
end
