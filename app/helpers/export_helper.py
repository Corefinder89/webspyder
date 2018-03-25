import os
import uuid

from .pdf_helper import PDFHelper

from subprocess import call


class ExportHelper:

    def __init__(self):
        self._ZOOM_LEVEL = '5'
        self.directory = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../static/exports')

        if not os.path.exists(self.directory):
            os.makedirs(self.directory)

    def export_to_pdf(self, data, svgs):
        charts = {}

        for svg in svgs.keys():
            charts[svg] = self.export_to_png(str(uuid.uuid4()), svgs[svg])

        return PDFHelper().generate_pdf(self.directory, charts, data)

    def export_to_png(self, id, data):
        svg_file = os.path.join(self.directory, '{}.svg'.format(id))
        png_file = os.path.join(self.directory, '{}.png'.format(id))

        ExportHelper.write_to_file(data, svg_file)
        ExportHelper.convert_to_png(svg_file, png_file, self._ZOOM_LEVEL)
        os.remove(svg_file)

        return png_file

    @staticmethod
    def write_to_file(data, file_name):
        with open(file_name, 'w') as file:
            file.write(data)
            file.close()

    @staticmethod
    def convert_to_png(svg_file, png_file, zoom_level):
        command = [
            'rsvg-convert',
            '-o', png_file,
            '-z', zoom_level,
            '-f', 'png',
            svg_file
        ]

        call(command)
